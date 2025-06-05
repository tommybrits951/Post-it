const router = require("express").Router()
const controller = require("../controllers/favController")


router.post("/", controller.addFav)
router.delete("/:board_id/:user_id", controller.removeFav)


module.exports = router