const router = require("express").Router()
const controller = require("../controllers/userController")
const upper = require("../middleware/upperCase")
const checkFields = require("../middleware/checkFields")
router.post("/", upper, checkFields, controller.register)
router.get("/", controller.getUsers)
router.get("/:user_id", controller.getUserById)

module.exports = router