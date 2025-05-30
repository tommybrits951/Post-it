const Post = require("../models/Post")
const { format } = require("date-fns")

async function createPost(req, res) {
    try {
        const { text, board_id, author_id } = req.body;
        const { img } = req.files
        if (!board_id || !author_id) {
            return res.status(400).json({ message: "missing board i.d. or user i.d." })
        }
        if (!text && !img) {
            return res.status(400).json({ message: "A photo or text is required!" })
        }
        const posted = format(new Date(), "yyyy-MM-dd hh:mm:ss")
        const result = await Post.insertPost({ text, board_id, author_id, posted })
        if (result) {
            res.status(201).json(result)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message || "Problem creating post!" })
    }
}
async function getPostsByBoard(req, res) {
    try {
        const { board_id } = req.params;

        let posts = await Post.getByBoard(board_id)
        posts.sort((a, b) => a.posted - b.posted)

        res.status(200).json(posts)
    } catch (err) {
        return res.status(500).json({ message: err.message || "Problem getting posts!" })
    }
}

module.exports = {
    createPost,
    getPostsByBoard
}