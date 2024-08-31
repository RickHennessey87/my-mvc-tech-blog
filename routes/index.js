const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const authRoutes = require('./authRoutes');

router.use('/', homeRoutes);
router.use('/auth', authRoutes);

module.exports = router;