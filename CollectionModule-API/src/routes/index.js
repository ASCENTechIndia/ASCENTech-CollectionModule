const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const menuRoutes = require('../modules/menu/menu.routes');
const masterRoutes = require('../modules/master/master.routes');
const legacyRoutes = require('../modules/legacy/legacy.routes');
const usersRoutes = require('../modules/users/users.routes');
const assetsRoutes = require('../modules/assets/assets.routes');
const assignPincode = require('../modules/AssignPincode/assignPincode.routes');

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





router.use('/assignPincode', assignPincode);

module.exports = router;
