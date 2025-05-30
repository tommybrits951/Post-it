const User = require("../models/User")
const bcrypt = require("bcrypt")
const sharp = require("sharp")
const path = require("path")
const fs = require("fs")
const fsPromises = require("fs/promises")
const {format} = require("date-fns")

async function createOutput(img) {
    await fsPromises.writeFile(path.join(__dirname, "output.png"), img.data)
}
async function extractImage(left, top, width, height) {
    const output = path.join(__dirname, "output.png")
    const tmp = await sharp(output).extract({ left: parseInt(left), top: parseInt(top), width: parseInt(width), height: parseInt(height) }).toBuffer()
    return tmp
}
async function uploadProfilePic(x, y, width, height, email) {
    const tmp = await extractImage(x, y, width, height)
    if (!fs.existsSync(path.join(__dirname, "..", "images", "profile", `${email}.png`))) {
        await fsPromises.appendFile(path.join(__dirname, "..", "images", "profile", `${email}.png`), tmp)
    } else {
        await fsPromises.writeFile(path.join(__dirname, "..", "images", "profile", `${email}.png`), tmp)
    }
}

async function register(req, res) {
    try {
        const { email, username, password, phone, firstName, lastName, x, y, width, height } = req.body
        const { img } = req.files
        
        const dupEmail = await User.getByEmail(email)
        const dupUsername = await User.getByUsername(username) 
         if (dupEmail) {
            return res.status(400).json({message: "Email already in use."})
        }
        if (dupUsername) {
            return res.status(400).json({message: "Username already in use."})
        } 
        await createOutput(img)
        await uploadProfilePic(x, y, width, height, email)
        const hashed = bcrypt.hashSync(password, 10)
        
        const joined = format(new Date(), "yyyy-MM-dd hh:mm:ss")
 
        const result = await User.insertUser({ firstName, lastName, username, email, phone, password: hashed, joined, pic: `${email}.png` })
        


        if (result) {
            res.status(201).json({ message: `User ${username} created.` })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message || "Problem adding user." });
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.getAll()
        if (users) {
            return res.status(200).json(users)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message || "Problem getting users." });
    }
}

async function getUserById(req, res) {
    try {
        const {user_id} = req.params;
        const user = await User.getById(user_id)
        const result = {...user, password: undefined}
        if (result) {
            res.status(200).json(result)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message || "Problem getting user." });
    }
} 


module.exports = {
    register,
    getUsers,
    getUserById
}