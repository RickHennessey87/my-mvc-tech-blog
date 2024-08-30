const router = require('express').Router();
const { BlogPost } = require('../models');

router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            attributes: ['id', 'title', 'content', 'date_created']
        });

        const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

        res.render('home', {
            blogPosts,
            loggedIn: req.session.loggedIn
        });

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;