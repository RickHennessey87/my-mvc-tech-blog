const router = require('express').Router();
const { BlogPost } = require('../models');

router.get('/', async (req, res) => {
    try {
        // const blogPostData = await BlogPost.findAll({
        //     attributes: ['id', 'title', 'content', 'date_created']
        // });

        // const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

        const blogPosts = [
            { title: 'First Post', content: 'This is the first post.', date_created: '2024-08-30' }
        ];

        // res.render('homepage', {
        //     blogPosts,
        //     loggedIn: req.session.loggedIn
        // });

        res.render('homepage', { 
            blogPosts,
            loggedIn: req.session.loggedIn
        });

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;