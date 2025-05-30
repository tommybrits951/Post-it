const jwt = require("jsonwebtoken")
const User = require("../models/User")

async function checkAuth(req, res, next) {
    try {
        
        const auth = req.headers.authorization
        const token = auth.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS)
        const confirmed = await User.getById(decoded.user_id)
        if (!confirmed) {
            return res.status(401).json({message: "Not Authorized!"})
        }
        next()
    } catch (err) {
        res.status(500).json({message: err.message || "Not authorized!"})
    }
}

module.exports = checkAuth