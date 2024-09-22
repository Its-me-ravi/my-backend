// routes/post.js
const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create post (authenticated)
router.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = new Post({ title, content, user: req.user.id });
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// Get all posts (public)
router.get('/', async (req, res) => {
    const posts = await Post.find().populate('user', 'username');
    res.json(posts);
});

// Get a single post (public)
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id).populate('user', 'username');
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
});

// Update post (authenticated)
router.put('/:id', authMiddleware, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
        return res.status(403).json({ msg: "Not authorized" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();
    res.json(post);
});

// Delete post (authenticated)
router.delete('/:id', authMiddleware, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
        return res.status(403).json({ msg: "Not authorized" });
    }

    await post.remove();
    res.json({ msg: "Post removed" });
});

module.exports = router;
