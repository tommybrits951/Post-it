const db = require("../config/dbConfig")


async function getAll(user_id) {
    const favs = await db("favs as f").leftJoin("boards as b", "f.board_id", "b.board_id").select("b.board_id").where("f.user_id", user_id)
    return favs
}

async function insertFav(fav) {
    const result = await db("favs").insert(fav).returning("*")
    return result
}
async function dropFav(board_id, user_id) {
    const result = await db("favs").where({board_id, user_id}).delete().returning(`board_id`, "user_id")
    return result
}
async function getByIds(board_id, user_id) {
    const fav = await db('favs').where({board_id, user_id}).first()
    return fav
}
module.exports = { getAll, insertFav, dropFav, getByIds }