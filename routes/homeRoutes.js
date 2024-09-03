const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const authMiddleware = require('../helpers/authMiddleware');

router.get('/dashboard', authMiddleware, (req, res) => {
    res.render('dashboard');
})

router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            attributes: ['id', 'title', 'content', 'date_created'],
            order: [['date_created', 'DESC']]
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

router.get('/posts/:id', async (req, res) => {
    try {
        const post = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['content', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        if (!post) {
            return res.status(404).render('404', {
                message: 'No post found.'
            });
        }

        const postData = post.get({ plain: true });

        res.render('postDetails', { post: postData, loggedIn: req.session.loggedIn });

    } catch (error) {
        console.error('Error fetching post details:', error);
        res.status(500).json({
            message: 'Error fetching post details'
        });
    }
});


module.exports = router;
