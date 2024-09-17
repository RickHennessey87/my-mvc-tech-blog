const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const authMiddleware = require('../helpers/authMiddleware');

router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const userPostsData = await BlogPost.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'content', 'date_created'],
            include: [
                {
                    model: Comment,
                    attributes: ['content', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
            order: [['date_created', 'DESC']]
        });

        const userPosts = userPostsData.map((post) => post.get({
            plain: true
        }));

        res.render('dashboard', {
            userPosts,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });

    } catch (error) {
        console.error('Error fetching user posts:', error);

        res.status(500).json({
            message: 'Error fetching user posts',
        });
    }
});

router.post('/dashboard/new', authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title.trim() || !content.trim()) {
            res.status(400).json({
                    message: 'Title and content required to create a post.'
                });
            return;
        }

        await BlogPost.create({
            title,
            content,
            user_id: req.session.user_id,
            date_created: new Date()
        });

        res.redirect('/dashboard');

    } catch (error) {
        console.error('Error creating post:', error);

        res.status(500).json({
            message: 'Failed to create blog post.'
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            attributes: ['id', 'title', 'content', 'date_created'],
            order: [['date_created', 'DESC']]
        });

        const blogPosts = blogPostData.map((post) => post.get({ 
            plain: true 
        }));

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
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id','content', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        if (!postData) {
            return res.status(404).render('404', {
                message: 'No post found.'
            });
        }

        const post = postData.get({ 
            plain: true 
        });

        console.log('Post data:', post);

        res.render('postDetails', { 
            post, 
            loggedIn: req.session.loggedIn 
        });



    } catch (error) {
        console.error('Error fetching post details:', error);
        res.status(500).json({
            message: 'Error fetching post details'
        });
    }
});

router.get('/dashboard/edit/:id', authMiddleware, async (req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            where: {
                user_id: req.session.user_id
            }
        })

        if (!postData) {
            return res.status(404).json({
                message: 'No blog post found.'
            });
        }

        const post = postData.get({
            plain: true
        })

        res.render('editPost', {
            post,
            loggedIn: req.session.loggedIn
        });

    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({
            message: 'Error fetching blog post.'
        });
    }
})

router.post('/dashboard/edit/:id', authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;

        await BlogPost.update({
            title,
            content
        },
        {
            where: {
                id:req.params.id,
                user_id: req.session.user_id
            }
        });

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({
            message: 'Error updating post.'
        });
    }
});

router.post('/dashboard/delete/:id', authMiddleware, async (req, res) => {
    try {

        await Comment.destroy({
            where: {
                post_id: req.params.id
            }
        });

        await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({
            message: 'Error deleting post.'
        });
    }
});


module.exports = router;
