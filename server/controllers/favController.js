const Fav = require("../models/Fav")




async function addFav(req, res) {
    try {
        const { board_id, user_id } = req.body
        if (!board_id || !user_id) {
            return res.status(400).json({ message: "Missing required fields!" })
        }
        const result = await Fav.insertFav({ user_id, board_id })
        res.status(201).json(result)
    } catch (err) {
        return res.status(500).json({ message: err.message || "Failure adding fav!" })
    }
}

async function removeFav(req, res) {
    try {
        const { board_id } = req.params;
        if (!board_id) {
            return res.status(400).json({ message: "Parameters in URL are no missing." })
        }
        const result = await Fav.dropFav(board_id)

        if (result) {
            res.json(board_id)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message || "Failure adding fav!" })
    }
}
module.exports = {
    addFav,
    removeFav
}