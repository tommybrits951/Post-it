const db = require("../config/dbConfig")



async function insertPostImage(img) {
    const result = await db("images").insert(img).returning("image_id")
    return result
}

async function getByPost(post_id) {
    const result = await db("images").where("post_id", post_id)
    return result
}

module.exports = {
    getByPost,
    insertPostImage
}