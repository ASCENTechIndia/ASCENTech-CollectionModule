const Joi = require('joi');

/**
 * Validation schema for property summary dashboard
 */
const propertySummaryDashboardSchema = Joi.object({
  // No required parameters for dashboard endpoint
}).unknown(true);

module.exports = {
  propertySummaryDashboardSchema,
};
