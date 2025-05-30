const router = require("express").Router()
const controller = require("../controllers/boardController")
const checkAuth = require("../middleware/checkAuth")
router.post("/", checkAuth, controller.createBoard)
router.get("/", checkAuth, controller.getBoards)
router.get("/:id", checkAuth, controller.getBoard)

module.exports = router