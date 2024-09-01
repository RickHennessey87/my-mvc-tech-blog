const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

router.use('/', homeRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
