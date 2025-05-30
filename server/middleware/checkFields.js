

async function checkFields(req, res, next) {
    const {firstName, lastName, phone, username, email, password} = req.body;
    if (!firstName || !lastName || !phone || !username || !email || !password) {
        return res.status(400).json({message: "All fields required."})
    }
    req.body.phone = parseInt(phone)
    next()
}
module.exports = checkFields