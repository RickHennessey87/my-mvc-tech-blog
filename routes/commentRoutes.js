const router = require('express').Router();
const { Comment } = require('../models');

router.post('/comment', async (req, res) => {
    try {
        const { postId, content } = req.body;

        await Comment.create({
            postId,
            content,
            userId: req.session.user_id
        });

        res.redirect(`/posts/${postId}`);

    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({
            message: 'Error creating comment'
        });
    }
});

module.exports = router;