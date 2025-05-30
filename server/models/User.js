const db = require("../config/dbConfig")


async function getById(id) {
    const user = await db("users").where("user_id", id).first()
    return user
}

async function insertUser(user) {
    const obj = await db("users").insert(user).returning("*")
    
    return obj
}
async function getByEmail(email) {
    const user = await db("users").where("email", email).first()
    return user
}
async function getByUsername(username) {
    const user = await db("users").where("username", username).first()
}
async function getAll() {
    const users = await db("users").select("email", "username", "firstName", "lastName", "phone", "joined")
    return users
}

module.exports = {
    getById,
    insertUser,
    getAll,
    getByEmail,
    getByUsername
}