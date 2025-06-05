const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Fav = require("../models/Fav")

function buildToken(user, exp, secret) {
    
    const payload = {
        user_id: user.user_id,
        username: user.username,
        email: user.email, 
        phone: user.phone, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        joined: user.joined
    }
    const options = {
        expiresIn: exp,
    }
    return jwt.sign(payload, secret, options)
}



async function logout(req, res) {
    try {
        
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true
        })
        res.json({ data: null})
        console.log(token)
    } catch (err) {
        res.status(500).json({message: err.message || " You're trapped!"})
    }
}





async function login(req, res) {
    try {
        const { email, password} = req.body;
        if ( !email || !password) {
            return res.status(400).json({message: "All fields required!"})
        }
        const user = await User.getByEmail(email)
        const verified = bcrypt.compareSync(password, user.password)
        if (!verified || !user) {
            return res.status(400).json({message: "Incorrect email or password!"})
        }
        const refreshToken = buildToken(user, "1d", process.env.REFRESH)
        const accessToken = buildToken(user, "1h", process.env.ACCESS)

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })
        res.json({accessToken})
    } catch (err) {
        return res.status(500).json({message: err.message || "Problem logging in!"})
    }
}

async function refreshHandle(req, res) {
    try {
        const token = req.cookies.jwt
        const decoded = jwt.verify(token, process.env.REFRESH)
        const confirmed = await User.getById(decoded.user_id)
        if (confirmed) {
            const accessToken = buildToken(confirmed, "1h", process.env.ACCESS)
            return res.status(200).json(accessToken)
        }
    } catch (err) {
        return res.status(500).json({message: err.message || "Problem logging in!"})
    }
}


async function decodeUser(req, res ) {
    try {
        const auth = req.headers.authorization
        const token = auth.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS)
        const favs = await Fav.getAll(decoded.user_id)
        let results = {...decoded, favs: []}
        favs.map(fav => {
            results = {...results, favs: [...results.favs, fav.board_id]}
        })
        if (results) {
            res.status(200).json(results)
        }
    } catch (err) {
        return res.status(500).json({message: err.message || "Problem decoding user!"})
    }
}


module.exports = {
    login,
    refreshHandle,
    decodeUser,
    logout
}