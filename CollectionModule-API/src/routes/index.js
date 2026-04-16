const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const menuRoutes = require('../modules/menu/menu.routes');
const masterRoutes = require('../modules/master/master.routes');
const legacyRoutes = require('../modules/legacy/legacy.routes');
const usersRoutes = require('../modules/users/users.routes');
const assetsRoutes = require('../modules/assets/assets.routes');
const assignPincode = require('../modules/AssignPincode/assignPincode.routes');
const passwordRoutes = require('../modules/Password/Password.routes')
const inactiveUserAccountsRoutes = require('../modules/InactiveUserAccounts/inactiveUserAccounts.routes');
const adminRoutes = require('../modules/Admin/Admin.routes');
const activeAgentsRoutes = require('../modules/Dashboard/ActiveAgents/activeAgents.routes');
const dispositionDashboardRoutes = require('../modules/Dashboard/DispositionDashboard/dispositionDashboard.routes');
const reportRoutes = require('../modules/Reports/Reports.routes');
const dailyVisitRoutes = require('../modules/Dashboard/DailyVisit/dailyVisit.routes');

const router = express.Router();

router.get('/health', (req, res) => {
  return res.ok(null, 'ok');
});

router.get('/ready', (req, res) => {
  return res.ok(null, 'ready');
});

router.use('/auth', authRoutes);
router.use('/master', menuRoutes);
router.use('/master', masterRoutes);
router.use('/users', usersRoutes);
router.use('/assets', assetsRoutes);
router.use('/legacy', legacyRoutes);
router.use('/password', passwordRoutes);



router.use('/assignPincode', assignPincode);
router.use('/password', passwordRoutes);
router.use('/admin', adminRoutes);
router.use('/reports', reportRoutes);



router.use('/inactive-user-accounts', inactiveUserAccountsRoutes);
router.use('/active-agents', activeAgentsRoutes);
router.use('/disposition-dashboard', dispositionDashboardRoutes);
router.use('/daily-visit', dailyVisitRoutes);

module.exports = router;
