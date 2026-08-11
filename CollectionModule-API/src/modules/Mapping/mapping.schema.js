/**
 * UserCreation Schema
 * 
 * Database tables used:
 * - aoup_usermst_def: Main user master table
 * - aoup_working_mas: Working for lookup
 * - aoup_designation_def: Designation lookup
 * - aoup_collectionteam_mas: Collection team lookup
 * - aoup_productcategory_mas: Product category lookup
 * - aoup_companycode_mas: Company code lookup
 * - aoup_employer_mas: Employer master
 * - aoup_idproof_mas: ID proof type lookup
 * - aoup_assetowner_mas: Asset owner lookup
 * - aoup_userrole_mas: User role lookup
 * - aoup_userdevice_mas: User device type lookup
 * - branchlist: Branch master
 * 
 * Stored Procedures:
 * - aoup_user_ins_New: Create new user
 * - aoup_user_ins: Update existing user
 */

const userCreationSchema = {
  userDetails: {
    userId: 'string',
    username: 'string',
    firstName: 'string',
    lastName: 'string',
    mobileNo: 'number',
    email: 'string',
    dateOfBirth: 'date',
    branch: 'number',
    designation: 'number',
    role: 'number',
    device: 'number',
    companyCode: 'number',
    workingFor: 'number',
    employer: 'number',
    collectionTeam: 'number',
    productCategory: 'number',
    status: 'string',
    employeeCode: 'string',
    idProofType: 'number',
    idProofNumber: 'string',
    createdBy: 'string',
    createdDate: 'date',
    updatedBy: 'string',
    updatedDate: 'date',
  },

  userImages: {
    userId: 'string',
    proofImage: 'blob',
    proofImageType: 'string', // IMAGE, PDF, WORD
    proofImage2: 'blob',
    proofImageType2: 'string',
    undertakingImage: 'blob',
    undertakingImageType: 'string',
  },

  lookupTables: {
    workingFor: { name: 'aoup_working_mas', idField: 'num_working_id', nameField: 'var_working_name' },
    designation: { name: 'aoup_designation_def', idField: 'num_designation_id', nameField: 'var_designation_designation' },
    collectionTeam: { name: 'aoup_collectionteam_mas', idField: 'num_collectionteam_id', nameField: 'var_collectionteam_name' },
    productCategory: { name: 'aoup_productcategory_mas', idField: 'num_productcategory_id', nameField: 'var_productcategory_name' },
    companyCode: { name: 'aoup_companycode_mas', idField: 'num_companycode_id', nameField: 'var_companycode_code' },
    employer: { name: 'aoup_employer_mas', idField: 'num_employer_id', nameField: 'var_employer_name' },
    idProof: { name: 'aoup_idproof_mas', idField: 'num_idproof_id', nameField: 'var_idproof_name' },
    assetOwner: { name: 'aoup_assetowner_mas', idField: 'num_assetowner_id', nameField: 'var_assetowner_name' },
    userRole: { name: 'aoup_userrole_mas', idField: 'num_userrole_id', nameField: 'var_userrole_name' },
    userDevice: { name: 'aoup_userdevice_mas', idField: 'num_userdevice_id', nameField: 'var_userdevice_name' },
    branch: { name: 'branchlist', idField: 'brid', nameField: 'branchname' },
  },

  storedProcedures: {
    createUser: 'aoup_user_ins_New',
    updateUser: 'aoup_user_ins',
  },

  userRoles: {
    FOS: 1, // Field Operating Staff
    BranchOperations: 2,
    Admin: 3,
    UpassAdmin: 4,
  },

  userStatus: {
    Active: 'A',
    Inactive: 'I',
    Unverified: 'U',
  },

  userDevice: {
    Web: 1,
    Mobile: 2,
  },

  workingFor: {
    Dealer: 1,
    AssociatePartner: 2,
    CollectionAgency: 3,
    TATAMotorsFinance: 4,
    TATAMotorsFinanceSolutionsLtd: 5,
  },

  idProofTypes: {
    PAN: 1,
    Aadhaar: 2,
    Passport: 3,
  },
};

module.exports = userCreationSchema;
