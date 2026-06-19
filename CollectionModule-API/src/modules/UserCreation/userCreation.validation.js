const { z } = require('zod');

const createUserSchema = z.object({
  in_brid:                        z.coerce.number({ required_error: 'in_brid is required' }),
  in_userid:                      z.string({ required_error: 'in_userid is required' }).min(1),
  in_username:                    z.string({ required_error: 'in_username is required' }).min(1),
  in_userpwd:                     z.string({ required_error: 'in_userpwd is required' }).min(1),
  in_mobno:                       z.coerce.number({ required_error: 'in_mobno is required' }),
  in_email:                       z.string().email().optional().nullable(),
  in_usertypeid:                  z.coerce.number({ required_error: 'in_usertypeid is required' }),
  in_DOB:                         z.string().optional().nullable(),   // e.g. "1990-05-15"
  in_proofno:                     z.string().optional().nullable(),
  in_desgid:                      z.coerce.number({ required_error: 'in_desgid is required' }),
  in_roleid:                      z.coerce.number({ required_error: 'in_roleid is required' }),
  in_compcode:                    z.coerce.number({ required_error: 'in_compcode is required' }),
  in_workid:                      z.coerce.number().optional().nullable(),
  in_empid:                       z.coerce.number().optional().nullable(),
  in_collectionid:                z.coerce.number().optional().nullable(),
  in_categoryid:                  z.coerce.number().optional().nullable(),
  in_status:                      z.string().default('A'),
  in_Empcode:                     z.string().optional().nullable(),
  in_firstname:                   z.string({ required_error: 'in_firstname is required' }).min(1),
  in_lastname:                    z.string().optional().nullable(),
  in_prooftype:                   z.coerce.number().optional().nullable(),
  in_mode:                        z.coerce.number().default(1),
  in_compid:                      z.coerce.number({ required_error: 'in_compid is required' }),
  in_insby:                       z.string({ required_error: 'in_insby is required' }).min(1),
  in_Requeststatus:               z.string().default('P'),
  in_var_user_teamlead:           z.string().optional().nullable(),
  in_num_fosmst_whatsapp:         z.coerce.number().optional().nullable(),
  in_var_fosmst_skills:           z.string().optional().nullable(),
  in_var_fosmst_geo_zones:        z.string().optional().nullable(),
  in_num_fosmst_max_cases_day:    z.coerce.number().optional().nullable(),
  in_num_fosmst_current_open_cases: z.coerce.number().optional().nullable(),
  in_var_fosmst_aadhar_ref:       z.string().optional().nullable(),
  in_dat_fosmst_joining_date:     z.string().optional().nullable(),  // "YYYY-MM-DD"
  in_dat_fosmst_exit_date:        z.string().optional().nullable(),  // "YYYY-MM-DD"
  in_num_fosmst_created_by:       z.coerce.number().optional().nullable(),
});

module.exports = { createUserSchema };
