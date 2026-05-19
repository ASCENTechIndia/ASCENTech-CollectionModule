/**
 * AgencyCreation Module Schema Documentation
 * ============================================
 * This module handles agency creation and management
 * Converted from FrmAgencyCreation.aspx.cs
 */

// ============================================================================
// DATABASE TABLES
// ============================================================================

/**
 * Agencies - Agency Master Table
 * PK: AgencyID
 * Columns:
 *   - AgencyID (auto-increment)
 *   - AgencyName (varchar)
 *   - StateID (FK to States)
 *   - DistrictID (FK to Districts)
 *   - VillageName (varchar) [Used for City/Area]
 *   - Address (varchar)
 *   - PRODUCTS (varchar, comma-separated)
 *   - SMA_BUCKET (varchar, comma-separated)
 *   - CreatedDate (timestamp)
 *   - ModifiedDate (timestamp)
 */

/**
 * States - State Master Table
 * PK: StateID
 * Columns:
 *   - StateID (auto-increment)
 *   - StateName (varchar)
 */

/**
 * Districts - District Master Table
 * PK: DistrictID
 * Columns:
 *   - DistrictID (auto-increment)
 *   - DistrictName (varchar)
 *   - StateID (FK to States)
 */

// ============================================================================
// CONSTANTS
// ============================================================================

const MAIN_PRODUCTS = {
  COMMERCIAL: 1,
  NON_COMMERCIAL: 2,
  TRANSPORT: 3,
};

const PRODUCT_OPTIONS = {
  1: [ // Commercial
    'Office',
    'Shop',
    'Mall',
  ],
  2: [ // Non Commercial
    'House',
    'Flat',
    'Bungalow',
  ],
  3: [ // Transport
    'Truck',
    'Bus',
    'Taxi',
  ],
};

const SMA_BUCKETS = [
  'ALL SMA',
  'SMA0',
  'SMA1',
  'SMA2',
];

// ============================================================================
// FORM FIELDS MAPPING
// ============================================================================

/**
 * Form Field Mapping (From FrmAgencyCreation.aspx)
 * ===============================================
 * 
 * txtAgencyName        -> payload.agencyName    (AgencyName)
 * ddlState             -> payload.stateId       (StateID)
 * ddlDistrict          -> payload.districtId    (DistrictID)
 * txtVillage           -> payload.city          (VillageName)
 * txtAddress           -> payload.address       (Address)
 * chkProductOptions    -> payload.products      (PRODUCTS) [comma-separated]
 * chkSMA               -> payload.smaBucket     (SMA_BUCKET) [comma-separated]
 * ddlMainProducts      -> Used for filtering product options (not stored)
 */

// ============================================================================
// VALIDATION RULES
// ============================================================================

/**
 * Agency Input Validation:
 * 
 * Agency Name:
 *   - Required
 *   - Minimum 3 characters
 *   - Must be unique
 *   - Cannot contain special characters (sanitized)
 * 
 * State:
 *   - Required
 *   - Must exist in States table
 * 
 * District:
 *   - Required
 *   - Must exist in Districts table
 *   - Must belong to selected State
 * 
 * City (Village):
 *   - Required
 *   - Minimum 3 characters
 * 
 * Address:
 *   - Required
 *   - Minimum 10 characters
 *   - Cannot be empty
 * 
 * Products:
 *   - Optional but recommended
 *   - Comma-separated values
 *   - Must be valid product options for main product
 * 
 * SMA Bucket:
 *   - Optional but recommended
 *   - Comma-separated values
 *   - Valid values: ALL SMA, SMA0, SMA1, SMA2
 */

// ============================================================================
// API ENDPOINTS
// ============================================================================

/**
 * Endpoints Summary:
 * 
 * PUBLIC ENDPOINTS:
 * - GET /states                    - Fetch all states
 * - GET /districts?stateId=X       - Fetch districts by state
 * - GET /product-options?mainProduct=X - Fetch product options
 * - GET /sma-buckets               - Fetch SMA bucket options
 * - GET /details?agencyId=X        - Get agency details
 * - GET /list?pageNumber=X&pageSize=Y - Get all agencies
 * 
 * PROTECTED ENDPOINTS (requires auth):
 * - POST /validate                 - Validate agency input
 * - POST /create                   - Create new agency
 * - PUT /update                    - Update existing agency
 * - DELETE /delete?agencyId=X      - Delete agency
 */

// ============================================================================
// BUSINESS LOGIC
// ============================================================================

/**
 * State/District Cascade:
 * 1. Load all states on form load
 * 2. When state changes, load districts for that state
 * 3. District dropdown is filtered by StateID
 * 
 * Product Selection:
 * 1. Main product dropdown triggers dynamic population
 * 2. Product checkboxes populated based on main product selection
 * 3. Multiple selection possible (stored as comma-separated)
 * 
 * SMA Bucket Selection:
 * 1. Fixed list of 4 options
 * 2. Multiple selection possible (stored as comma-separated)
 * 
 * Agency Creation:
 * 1. Validate all inputs
 * 2. Check agency name uniqueness
 * 3. Insert into Agencies table
 * 4. Store products and SMA as comma-separated strings
 */

// ============================================================================
// DATA TRANSFORMATIONS
// ============================================================================

/**
 * Product Options to Comma-Separated:
 * Input: ['Office', 'Shop']
 * Output: 'Office,Shop'
 * 
 * Database Retrieval:
 * Output: 'Office,Shop'
 * Transform: ['Office', 'Shop'] (split by comma)
 */

/**
 * SMA Bucket to Comma-Separated:
 * Input: ['ALL SMA', 'SMA1']
 * Output: 'ALL SMA,SMA1'
 * 
 * Database Retrieval:
 * Output: 'ALL SMA,SMA1'
 * Transform: ['ALL SMA', 'SMA1'] (split by comma)
 */

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Common Validation Errors:
 * 
 * 400 - Bad Request:
 *   - Agency name is required
 *   - Agency name must be at least 3 characters
 *   - State is required
 *   - District is required
 *   - City is required
 *   - Address is required
 *   - Address must be at least 10 characters
 *   - Agency with this name already exists
 * 
 * 404 - Not Found:
 *   - State not found
 *   - District not found
 *   - Agency not found
 * 
 * 500 - Server Error:
 *   - Database connection error
 *   - Query execution error
 */

// ============================================================================
// PAGINATION
// ============================================================================

/**
 * List Agencies Pagination:
 * 
 * Default: pageNumber=1, pageSize=10
 * 
 * Response:
 * {
 *   "success": true,
 *   "data": [...],
 *   "pagination": {
 *     "pageNumber": 1,
 *     "pageSize": 10,
 *     "totalRecords": 50,
 *     "totalPages": 5
 *   }
 * }
 */

module.exports = {
  MAIN_PRODUCTS,
  PRODUCT_OPTIONS,
  SMA_BUCKETS,
};
