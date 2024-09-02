const router = require('express').Router();
const { BlogPost, Comment } = require('../models');

router.get('/posts/:id', async (req, res) => {
    try {
        const post = await BlogPost.findByPk(req.params.id, {
            include: [{
                model: Comment,
                attributes: ['content', 'date_created']
            }]
        });

        if (!post) {
            return res.status(404).render('404', {
                message: 'No post found.'
            });
        }

        res.render('postDetails', { post });

    } catch (error) {
        console.error('Error fetching post details:', error);
        res.status(500).json({
            message: 'Error fetching post details'
        });
    }
});

module.exports = router;