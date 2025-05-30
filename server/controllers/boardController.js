const Board = require("../models/Board")
const Post = require("../models/Post")
const { format } = require("date-fns")
const path = require("path")
const fsPromises = require('fs/promises')

async function createBoard(req, res) {
    try {
        const { author_id, post, subject } = req.body;
        const { img, postImg } = req.files
        
        if (!author_id || !post || !subject) {
            return res.status(400).json({ message: "Missing required fields!" })
        }

        const board = await Board.insertBoard({})
        

        res.json(board)

    } catch (err) {
        res.status(500).json({ message: err.message || "Problem creating board!" })
    }
}
    async function getBoards(req, res) {
        try {
            const initial = await Board.getAll()
            
            let boards = []
            for (let i = 0; i < initial.length; i++) {
                let posts = await Post.getByBoard(initial[i].board_id)
                posts = posts.sort((a, b) => a.posted - b.posted)
                let board = {...initial[i], last: posts[0]}
                
                boards.push(board)
            }
            if (boards.length > 0) {
                res.status(200).json(boards)
            }

        } catch (err) {
            res.status(500).json({ message: err.message || "Problem getting boards!" })
        }
    }
    async function getBoard(req, res) {
        try {
            const { id } = req.params
            const board = await Board.getById(id)
            res.status(200).json(board)
        } catch (err) {
            res.status(500).json({ message: err.message || "Problem getting board!" })

        }
    }
    module.exports = {
        createBoard,
        getBoards,
        getBoard
    }