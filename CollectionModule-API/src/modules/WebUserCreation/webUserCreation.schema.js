/**
 * WebUserCreation Module Schema Documentation
 * ================================================
 * This module handles web-specific user creation functionality
 * Used in FrmUserCreationWeb.aspx conversion to Node.js
 * 
 * Key Differences from UserCreation Module:
 * - Uses aoup_user_ins_Web stored procedure instead of aoup_user_ins_New
 * - Role filtering: Only roles 2 and 5 for branch category 6
 * - No integration with external User Management Service
 * - Simpler post-creation logic with branch-based permission handling
 * - Includes FillEmployer() equivalent functionality
 * - Branch users cannot change their base branch (disabled field)
 */

// ============================================================================
// DATABASE TABLES
// ============================================================================

/**
 * aoup_usermst_def - User Master Table
 * PK: var_usermst_userid
 * Stores all user data including roles, designations, branches
 */

/**
 * aoup_working_mas - Working For Master
 * PK: num_working_id
 * Stores working for options (e.g., Organization names)
 */

/**
 * aoup_designation_def - Designation Master
 * PK: num_designation_id
 * Stores designation/position types
 */

/**
 * aoup_employer_mas - Employer Master
 * PK: num_employer_id
 * Stores employer/company information
 * New for Web variant - populates DdlEmployerName
 */

/**
 * aoup_collectionteam_mas - Collection Team Master
 * PK: num_collectionteam_id
 * Stores collection team information
 * Required for FOS (Field Officer Special) role
 */

/**
 * aoup_productcategory_mas - Product Category Master
 * PK: num_productcategory_id
 * Stores product categorization
 */

/**
 * aoup_companycode_mas - Company Code Master
 * PK: num_companycode_id
 * Stores company/branch codes
 */

/**
 * aoup_idproof_mas - ID Proof Type Master
 * PK: num_idproof_id
 * Stores ID proof types (PAN, Aadhaar, Passport)
 */

/**
 * aoup_userdevice_mas - User Device Master
 * PK: num_userdevice_id
 * Stores device types (Web=1, Mobile=2)
 */

/**
 * branchlist - Branch Master Table
 * PK: brid
 * Stores branch information
 * COMPID links to company hierarchy
 */

/**
 * aoup_userrole_mas - User Role Master
 * PK: num_userrole_id
 * Stores user role definitions
 * Web variant filters: roles 2 (BranchOperations) and 5 (only for branch category 6)
 */

/**
 * aoup_usertype_mas - User Type Master
 * PK: num_usertype_id
 * Stores device type classifications (1=Web, 2=Mobile)
 */

// ============================================================================
// STORED PROCEDURES
// ============================================================================

/**
 * PROCEDURE: aoup_user_ins_Web
 * 
 * Purpose: Insert/Update web user with simplified logic
 * Called from: Web user creation form (FrmUserCreationWeb.aspx)
 * 
 * Parameters (25):
 *   IN:  in_brid               - Branch ID (num_usermst_brid)
 *   IN:  in_userid             - User ID (var_usermst_userid) [NULL for new users]
 *   IN:  in_username           - User full name (var_usermst_username)
 *   IN:  in_userpwd            - Password (var_usermst_userpwd) [NULL - auto-generated]
 *   IN:  in_mobno              - Mobile number (num_usermst_mobileno)
 *   IN:  in_email              - Email (var_usermst_email)
 *   IN:  in_usertypeid         - Device type ID (num_usermst_usertype) [1=Web, 2=Mobile]
 *   IN:  in_DOB                - Date of birth (date_usermst_dob)
 *   IN:  in_proofno            - ID proof number (num_usermst_idproofno)
 *   IN:  in_desgid             - Designation ID (num_usermst_desgid)
 *   IN:  in_roleid             - Role ID (num_usermst_roleid)
 *   IN:  in_compcode           - Company code (num_usermst_compcode)
 *   IN:  in_workid             - Working for ID (num_usermst_workingid)
 *   IN:  in_empid              - Employer ID (num_usermst_empid) [New field for web]
 *   IN:  in_collectionid       - Collection team ID (num_usermst_collectionid)
 *   IN:  in_categoryid         - Category ID (num_usermst_categorisation)
 *   IN:  in_status             - Status (var_usermst_status) [A=Active, U=Unverified, I=Inactive]
 *   IN:  in_Empcode            - Employee code (var_usermst_empcode)
 *   IN:  in_firstname          - First name (var_usermst_userfirstname)
 *   IN:  in_lastname           - Last name (var_usermst_userlastname)
 *   IN:  in_prooftype          - Proof type ID (num_usermst_userprooftype) [1=PAN, 2=Aadhaar, 3=Passport]
 *   IN:  in_mode               - Mode (1=Insert, 2=Update)
 *   IN:  in_compid             - Company ID (num_usermst_compid)
 *   IN:  in_insby              - Inserted/Modified by user ID (var_usermst_insby)
 *   IN:  in_Requeststatus      - Request status (var_usermst_Requeststatus) [Default: 'A']
 *   OUT: Out_User              - Created/Updated user ID (String)
 *   OUT: Out_errorCode         - Error code (Number) [-100=Success, other=Failure]
 *   OUT: Out_ErrorMsg          - Error message (String)
 * 
 * Logic:
 * - Does NOT call external User Management Service
 * - Simpler error handling than regular aoup_user_ins
 * - No Service integration for FOS role
 * - Branch-based permission checks only
 */

// ============================================================================
// CONSTANTS
// ============================================================================

const USER_ROLES = {
  FOS: 1,                    // Field Officer Special
  BRANCH_OPERATIONS: 2,      // Branch Operations
  ADMIN: 3,                  // Admin
  OPERATIONS: 4,             // Operations
  SPECIAL_ROLE: 5,           // Special role (available to web users)
};

const USER_STATUS = {
  ACTIVE: 'A',               // Active
  UNVERIFIED: 'U',           // Unverified (awaiting verification)
  INACTIVE: 'I',             // Inactive
};

const DEVICE_TYPES = {
  WEB: 1,                    // Web device
  MOBILE: 2,                 // Mobile device
};

const USER_CATEGORY = {
  HO: 1,                     // Head Office
  BRANCH: 6,                 // Branch (Special category for web users)
};

const ID_PROOF_TYPES = {
  PAN: 1,                    // PAN - Format: 5letters + 4digits + 1letter
  AADHAAR: 2,                // Aadhaar - Format: 12 digits
  PASSPORT: 3,               // Passport - Format: 1letter + 7digits
};

// ============================================================================
// WEB USER CREATION FORM FIELDS
// ============================================================================

/**
 * Form Field Mapping (From FrmUserCreationWeb.aspx)
 * ============================================
 * 
 * txtfirstname        -> payload.firstname     (var_usermst_userfirstname)
 * txtlastname         -> payload.lastname      (var_usermst_userlastname)
 * DdlUserbasebranch   -> payload.brid          (num_usermst_brid)
 * txtUserID           -> payload.userid        (var_usermst_userid) [auto-generated format: E+COMPID+COUNT]
 * DdlWorkingfor       -> payload.workid        (num_usermst_workingid)
 * DdlEmployerName     -> payload.empid        (num_usermst_empid) [NEW FOR WEB]
 * DdlDesg             -> payload.desgid       (num_usermst_desgid)
 * DdlUserRole         -> payload.roleid       (num_usermst_roleid) [Filtered: roles 2, 5 for branch category]
 * DdlCollectionTeam   -> payload.collectionid (num_usermst_collectionid) [Required for FOS role]
 * DdlCategorisation   -> payload.categoryid   (num_usermst_categorisation)
 * DdlCompanycode      -> payload.compcode     (num_usermst_compcode)
 * txtDateOfBirth      -> payload.dob          (date_usermst_dob)
 * txtMobileNo         -> payload.mobno        (num_usermst_mobileno)
 * txtEmail            -> payload.email        (var_usermst_email)
 * DdlIDProof          -> payload.prooftype    (num_usermst_userprooftype)
 * txtProofNo          -> payload.proofno      (num_usermst_idproofno)
 * FileUpload1         -> Image1               (blob_usermst_proofimage)
 * FileUpload2         -> Image2               (blob_usermst_proofimage2)
 * 
 * Special Handling:
 * - DdlUserbasebranch is DISABLED for Branch category users (DdlUserbasebranch.Enable(false))
 * - Collection Team dropdown required only when FOS role is selected
 * - Employer list populated dynamically from FillEmployer() method
 * - User ID generated automatically: GetUserId() -> "E" + CompanyCode + UserCount
 */

// ============================================================================
// STATUS DETERMINATION LOGIC (FrmUserCreationWeb)
// ============================================================================

/**
 * Auto-Status Determination:
 * 
 * FOS (Role 1):
 *   - Status: U (Unverified)
 *   - Requires collection team
 *   - Branch users cannot create FOS users
 * 
 * Branch Operations (Role 2):
 *   + Device Type Web (1): Status = A (Active)
 *   + Device Type Mobile (2): Status = U (Unverified)
 * 
 * Other Roles:
 *   - Status: A (Active)
 */

// ============================================================================
// ROLE FILTERING FOR WEB USERS
// ============================================================================

/**
 * Role Filtering Logic (Key Difference from UserCreation):
 * 
 * Branch Category (6) - Branch Level Users:
 *   Available roles: 2 (BranchOperations), 5 (SpecialRole)
 *   WHERE num_userrole_id IN (2, 5)
 * 
 * Other Categories (HO, etc):
 *   Available roles: All
 *   No WHERE clause
 */

// ============================================================================
// VALIDATION RULES
// ============================================================================

/**
 * Web User Input Validation:
 * 
 * First Name:
 *   - Required
 *   - Non-empty string
 * 
 * Last Name:
 *   - Required
 *   - Non-empty string
 * 
 * Branch (brid):
 *   - Required
 *   - Cannot be changed for branch-level users (UI disabled)
 * 
 * Designation (desgid):
 *   - Required
 * 
 * Role (roleid):
 *   - Required
 *   - Filtered by branch category (2, 5 for branch users)
 * 
 * Device Type (usertypeid):
 *   - Required
 *   - 1 = Web, 2 = Mobile
 * 
 * Working For (workid):
 *   - Required
 * 
 * Employer (empid):
 *   - Optional but available in dropdown
 *   - New field specific to web user creation
 * 
 * Mobile Number:
 *   - Required
 *   - Must be 10 digits
 *   - Cannot start with 0
 * 
 * Email:
 *   - Optional
 *   - Valid email format if provided
 * 
 * Date of Birth:
 *   - Optional
 *   - Valid date format
 *   - Age >= 18 years if provided
 * 
 * ID Proof:
 *   - Optional
 *   - If provided, must match proof type format:
 *     * PAN: 5 letters + 4 digits + 1 letter
 *     * Aadhaar: 12 digits
 *     * Passport: 1 letter + 7 digits
 * 
 * Collection Team (collectionid):
 *   - Required only for FOS (Role 1) users
 */

// ============================================================================
// FILE UPLOAD SPECIFICATIONS
// ============================================================================

/**
 * File Upload Configuration:
 * 
 * Storage: Memory-based (no disk writes)
 * Max Size: 300 KB (300 * 1024 bytes)
 * 
 * Supported Types:
 *   - Image: JPEG, PNG
 *   - Document: PDF, Word (.docx)
 * 
 * MIME Types:
 *   - image/jpeg
 *   - image/png
 *   - application/pdf
 *   - application/vnd.openxmlformats-officedocument.wordprocessingml.document
 * 
 * Database Columns:
 *   - Position 1: blob_usermst_proofimage (var_usermst_imagetype)
 *   - Position 2: blob_usermst_proofimage2 (var_usermst_imagetype2)
 * 
 * File Type Detection:
 *   - JPEG/PNG -> "IMAGE"
 *   - PDF -> "PDF"
 *   - Word -> "WORD"
 */

module.exports = {
  USER_ROLES,
  USER_STATUS,
  DEVICE_TYPES,
  USER_CATEGORY,
  ID_PROOF_TYPES,
};
