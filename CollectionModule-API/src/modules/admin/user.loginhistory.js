//const { executeQuery } = require("../src/db/queryExecutor.js"); // adjust path if needed

const { executeQuery } = require("../../db/queryExecutor");


const getLoginHistory = async (req, res) => {
  try {
    const { userid } = req.body;

    // ✅ Validation
    if (!userid) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // ✅ Oracle Query (SAFE - bind variable)
    const sql = `
      SELECT * FROM (
        SELECT 
          userid,
          ip_address,
          TO_CHAR(log_date, 'DD-MON-YYYY HH:MI:SS AM') AS log_date
        FROM atbss.Aoup_user_ip_log
        WHERE userid = :userid
        ORDER BY log_date DESC
      )
      WHERE ROWNUM <= 10
    `;

    // ✅ Execute using your common function
    const result = await executeQuery(sql, { userid });

    return res.status(200).json({
      success: true,
      count: result.rowCount,
      data: result.rows,
    });

  } catch (error) {
    console.error("Error in getLoginHistory:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getLoginHistory,
};