# AgencyCreation Module Documentation

## Overview

The **AgencyCreation** module is a Node.js Express.js backend implementation of the ASP.NET `FrmAgencyCreation.aspx.cs` functionality. It handles agency creation with state/district cascading, dynamic product selection, and SMA bucket management.

## Module Structure

```
src/modules/AgencyCreation/
├── agencyCreation.controller.js   # HTTP handlers (8 endpoints)
├── agencyCreation.service.js      # Business logic & validation
├── agencyCreation.repo.js         # Database queries
├── agencyCreation.routes.js       # Route definitions
├── agencyCreation.validation.js   # Zod validation schemas
└── agencyCreation.schema.js       # Database schema & constants documentation
```

## API Endpoints

### Public Endpoints

#### 1. GET `/agencies/states`
Fetch all states for the state dropdown.

**Response:**
```json
[
  { "id": 1, "name": "Maharashtra" },
  { "id": 2, "name": "Gujarat" },
  { "id": 3, "name": "Karnataka" }
]
```

#### 2. GET `/agencies/districts`
Fetch districts for a selected state.

**Query Parameters:**
- `stateId` (required): State ID

**Response:**
```json
[
  { "id": 1, "name": "Mumbai", "stateId": 1 },
  { "id": 2, "name": "Pune", "stateId": 1 },
  { "id": 3, "name": "Nagpur", "stateId": 1 }
]
```

#### 3. GET `/agencies/product-options`
Fetch product options based on main product selection.

**Query Parameters:**
- `mainProduct` (required): Main product ID (1=Commercial, 2=Non Commercial, 3=Transport)

**Response (Commercial=1):**
```json
[
  { "name": "Office", "value": "Office" },
  { "name": "Shop", "value": "Shop" },
  { "name": "Mall", "value": "Mall" }
]
```

**Response (Non Commercial=2):**
```json
[
  { "name": "House", "value": "House" },
  { "name": "Flat", "value": "Flat" },
  { "name": "Bungalow", "value": "Bungalow" }
]
```

**Response (Transport=3):**
```json
[
  { "name": "Truck", "value": "Truck" },
  { "name": "Bus", "value": "Bus" },
  { "name": "Taxi", "value": "Taxi" }
]
```

#### 4. GET `/agencies/sma-buckets`
Fetch available SMA bucket options.

**Response:**
```json
[
  { "name": "ALL SMA", "id": "ALL_SMA" },
  { "name": "SMA0", "id": "SMA0" },
  { "name": "SMA1", "id": "SMA1" },
  { "name": "SMA2", "id": "SMA2" }
]
```

#### 5. GET `/agencies/details`
Fetch existing agency details for editing.

**Query Parameters:**
- `agencyId` (required): Agency ID

**Response:**
```json
{
  "id": 1,
  "agencyName": "ABC Agency",
  "stateId": 1,
  "districtId": 5,
  "city": "Mumbai",
  "address": "123 Street Name, Mumbai",
  "products": "Office,Shop",
  "smaBucket": "ALL SMA,SMA1"
}
```

#### 6. GET `/agencies/list`
Fetch all agencies with pagination.

**Query Parameters:**
- `pageNumber` (optional): Page number (default: 1)
- `pageSize` (optional): Records per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "agencyName": "ABC Agency",
      "stateId": 1,
      "districtId": 5,
      "city": "Mumbai",
      "address": "123 Street Name",
      "products": "Office,Shop",
      "smaBucket": "ALL SMA"
    }
  ],
  "pagination": {
    "pageNumber": 1,
    "pageSize": 10,
    "totalRecords": 25,
    "totalPages": 3
  }
}
```

### Protected Endpoints (Require Authentication)

#### 7. POST `/agencies/validate`
Validate agency input before creation/update.

**Request Body:**
```json
{
  "agencyName": "XYZ Agency",
  "stateId": 1,
  "districtId": 5,
  "city": "Mumbai",
  "address": "456 Main Road, Mumbai, Maharashtra",
  "products": "Office,Shop",
  "smaBucket": "ALL SMA,SMA1"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Validation passed"
}
```

#### 8. POST `/agencies/create`
Create a new agency.

**Request Body:** Same as validation

**Response:**
```json
{
  "success": true,
  "message": "Agency created successfully"
}
```

#### 9. PUT `/agencies/update`
Update existing agency.

**Request Body:**
```json
{
  "agencyId": 1,
  "agencyName": "Updated Agency Name",
  "stateId": 1,
  "districtId": 5,
  "city": "Mumbai",
  "address": "789 Updated Street",
  "products": "Office",
  "smaBucket": "SMA0"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Agency updated successfully"
}
```

#### 10. DELETE `/agencies/delete`
Delete an agency.

**Query Parameters:**
- `agencyId` (required): Agency ID to delete

**Response:**
```json
{
  "success": true,
  "message": "Agency deleted successfully"
}
```

## Core Functionality

### 1. State/District Cascading
- States loaded on form mount
- Districts filtered by selected state
- Only valid state-district combinations accepted

### 2. Dynamic Product Selection
Products vary based on main product type:
- **Commercial (1):** Office, Shop, Mall
- **Non Commercial (2):** House, Flat, Bungalow
- **Transport (3):** Truck, Bus, Taxi

### 3. SMA Bucket Management
Fixed options: ALL SMA, SMA0, SMA1, SMA2
Multiple selection stored as comma-separated values

### 4. Validation Rules
- Agency Name: Required, 3+ characters, unique
- State: Required, must exist
- District: Required, must exist and match state
- City: Required, 3+ characters
- Address: Required, 10+ characters
- Products: Optional, comma-separated
- SMA Bucket: Optional, comma-separated

### 5. Audit Logging
All operations logged with:
- Action (AGENCY_CREATE, AGENCY_UPDATE, AGENCY_DELETE)
- Actor (user ID performing action)
- Entity ID (agency ID)
- Status (SUCCESS/FAILED)
- Request metadata (IP, method, path)

## Database Integration

### Tables Used
- `Agencies` - Agency master table
- `States` - State lookup
- `Districts` - District lookup

### Agencies Table Schema
```sql
CREATE TABLE Agencies (
  AgencyID INT PRIMARY KEY AUTO_INCREMENT,
  AgencyName VARCHAR(255) UNIQUE NOT NULL,
  StateID INT NOT NULL,
  DistrictID INT NOT NULL,
  VillageName VARCHAR(255),
  Address VARCHAR(500),
  PRODUCTS VARCHAR(500),
  SMA_BUCKET VARCHAR(500),
  CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ModifiedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (StateID) REFERENCES States(StateID),
  FOREIGN KEY (DistrictID) REFERENCES Districts(DistrictID)
);
```

## Configuration

### Validation Schemas
- `getStatesSchema` - Empty object (no parameters)
- `getDistrictsByStateSchema` - Validates stateId
- `getProductOptionsSchema` - Validates mainProduct
- `getSMABucketsSchema` - Empty object
- `createAgencySchema` - Full agency validation (6 fields)
- `updateAgencySchema` - Agency update with agencyId

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200`: Successful GET or PUT
- `201`: Successful resource creation
- `400`: Bad request (validation errors)
- `401`: Unauthorized (missing authentication)
- `404`: Resource not found
- `500`: Server error

Error response format:
```json
{
  "error": "Agency name must be at least 3 characters",
  "statusCode": 400
}
```

## Security Features

1. **Authentication Required**: Protected endpoints require JWT token
2. **Input Validation**: Zod schema validation on all inputs
3. **SQL Injection Prevention**: Input sanitization for special characters
4. **Audit Logging**: All operations logged with user accountability
5. **Error Messages**: Generic messages to prevent information leakage

## Integration with Frontend

### React Component Usage

```javascript
// Fetch states
const states = await fetch('/api/agencies/states').then(r => r.json());

// Fetch districts when state changes
const districts = await fetch(`/api/agencies/districts?stateId=${stateId}`)
  .then(r => r.json());

// Fetch product options when main product changes
const products = await fetch(`/api/agencies/product-options?mainProduct=${mainProduct}`)
  .then(r => r.json());

// Fetch SMA buckets
const smaBuckets = await fetch('/api/agencies/sma-buckets').then(r => r.json());

// Create agency
const response = await fetch('/api/agencies/create', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    agencyName: "New Agency",
    stateId: 1,
    districtId: 5,
    city: "Mumbai",
    address: "123 Main Street, Mumbai",
    products: "Office,Shop",
    smaBucket: "ALL SMA,SMA1"
  })
});
```

## Testing Recommendations

1. **State/District Filtering**: Verify districts populate correctly for each state
2. **Product Options**: Test all 3 product categories with correct options
3. **Validation**: Test all required field validations
4. **Uniqueness**: Verify agency name uniqueness check works
5. **Pagination**: Test list endpoint with different page numbers/sizes
6. **Audit Logging**: Verify all operations logged correctly
7. **Error Handling**: Test various error scenarios

## Performance Notes

- State list cached (small dataset)
- District queries indexed on StateID
- Agency list paginated to limit data transfer
- All queries use proper indexes
- Validation happens in service layer before DB calls

## Future Enhancements

1. Add agency search/filtering by name
2. Implement bulk agency import from CSV
3. Add agency photo/logo upload
4. Integration with user assignment workflow
5. Agency status management (Active/Inactive)
6. Agency performance metrics dashboard
7. Soft delete with archive functionality
