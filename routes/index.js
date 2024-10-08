const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const authRoutes = require('./authRoutes');
const commentRoutes = require('./commentRoutes')
const postRoutes = require('./postRoutes');

router.use('/', homeRoutes);
router.use('/auth', authRoutes);
router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);

module.exports = router;
