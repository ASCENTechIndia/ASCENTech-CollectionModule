const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const usersRoutes = require('../modules/users/users.routes');
const assignPincode = require('../modules/AssignPincode/assignPincode.routes');
const passwordRoutes = require('../modules/Password/Password.routes')
const inactiveUserAccountsRoutes = require('../modules/InactiveUserAccounts/inactiveUserAccounts.routes');
const adminRoutes = require('../modules/Admin/Admin.routes');
const activeAgentsRoutes = require('../modules/Dashboard/ActiveAgents/activeAgents.routes');
const dispositionDashboardRoutes = require('../modules/Dashboard/DispositionDashboard/dispositionDashboard.routes');
const reportRoutes = require('../modules/Reports/Reports.routes');
const dailyVisitRoutes = require('../modules/Dashboard/DailyVisit/dailyVisit.routes');
const transactionReportRoutes = require('../modules/TransactionReport/TransactionReport.routes');

const router = express.Router();

router.get('/health', (req, res) => {
  return res.ok(null, 'ok');
});

router.get('/ready', (req, res) => {
  return res.ok(null, 'ready');
});

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);



router.use('/assignPincode', assignPincode);
router.use('/password', passwordRoutes);
router.use('/admin', adminRoutes);
router.use('/reports', reportRoutes);
router.use('/transactionReports', transactionReportRoutes);


router.use('/inactive-user-accounts', inactiveUserAccountsRoutes);
router.use('/active-agents', activeAgentsRoutes);
router.use('/disposition-dashboard', dispositionDashboardRoutes);
router.use('/daily-visit', dailyVisitRoutes);

module.exports = router;
