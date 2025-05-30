const db = require("../config/dbConfig")


async function getAll(user_id) {
    const favs = await db("favs as f").leftJoin("boards as b", "f.board_id", "b.board_id").select("b.board_id")
    return favs
}

async function insertFav(fav) {
    const result = await db("favs").insert(fav).returning("*")
    return result
}
async function dropFav(board_id) {
    const result = await db("favs").where("board_id", board_id).delete().returning(`board_id`)
    return result
}

module.exports = { getAll, insertFav, dropFav }