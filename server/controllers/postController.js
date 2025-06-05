const Post = require("../models/Post")
const { format } = require("date-fns")
const fsPromises = require("fs/promises")
const path = require("path")


async function createPost(req, res) {
    try {
        const { txt, board_id, author_id } = req.body;
        let img 
        console.log(req.files.img)
        if (req.files.img !== null) {
            img = req.files.img
        } else {
            img = "empty"
        }
        if (!board_id || !author_id) {
            return res.status(400).json({ message: "missing board i.d. or user i.d." })
        }
        if ((!txt || txt === "") && img === "empty") {
            return res.status(400).json({ message: "A photo or text is required!" })
        }
        const posted = format(new Date(), "yyyy-MM-dd hh:mm:ss")
        if ((txt !== "" && txt) && img !== "empty") {
            await fsPromises.writeFile(path.join(__dirname, "..", "images", "posts", `${board_id}_${author_id}_${posted}.png`), img.data)
            const result = await Post.insertPost({text: txt, pic: `${board_id}_${author_id}_${posted}.png`, posted, board_id })
            res.json(result)
        } else if (txt !== "" && txt && img === "empty") {
            const result = await Post.insertPost({text: txt,  posted, board_id })
            res.json(result)
        } else if ((txt === "" || !txt) && img !== "empty") {
            await fsPromises.writeFile(path.join(__dirname, "..", "images", "posts", `${board_id}_${author_id}_${posted}.png`), img.data)
            const result = await Post.insertPost({ pic: `${board_id}_${author_id}_${posted}.png`, posted, board_id })
            res.json(result)
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