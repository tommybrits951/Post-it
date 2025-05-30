const router = require("express").Router()
const controller = require("../controllers/authController")
const checkAuth = require("../middleware/checkAuth")


router.post("/", controller.login)
router.get("/", controller.refreshHandle)
router.get("/user", controller.decodeUser)

module.exports = router