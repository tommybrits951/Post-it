const db = require("../config/dbConfig")
const { get } = require("../routes/authRoutes")


async function getAll() {
    const boards = await db("boards")
    return boards
}

async function getById(id) {
    const board = await db("boards").where("board_id", id).first()
    return board
}

async function insertBoard(board) {
    const result = await db("boards").insert(board).returning("*")
    return result
}

module.exports = {
    getAll,
    getById,
    insertBoard
}