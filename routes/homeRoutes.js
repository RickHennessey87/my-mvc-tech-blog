const router = require('express').Router();
const { BlogPost, User } = require('../models');
const authMiddleware = require('../helpers/authMiddleware');

router.get('/dashboard', authMiddleware, (req, res) => {
    res.render('dashboard');
})

router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            attributes: ['id', 'title', 'content', 'date_created']
        });

        const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

        console.log('Blog Posts:', blogPosts);

        res.render('homepage', {
            blogPosts,
            loggedIn: req.session.loggedIn
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json(error);
    }
});

module.exports = router;
