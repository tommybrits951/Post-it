const db = require("../config/dbConfig")




async function getById(id) {
    const post = await db("posts").where("post_id", id).first()
    return post
}

async function insertPost(post) {
    const result = await db("posts").insert(post).returning("*")
    return result
}

async function getByBoard(board_id) {
    const posts = await db("posts").where("board_id", board_id)
    return posts
}

module.exports = {
    getById,
    insertPost,
    getByBoard
}