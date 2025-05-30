const router = require("express").Router()
const controller = require("../controllers/postController")


router.post("/", controller.createPost)
router.get("/:board_id", controller.getPostsByBoard)

module.exports = router