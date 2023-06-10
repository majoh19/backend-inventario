const { Router } = require("express")
const {authenticateUsuario} = require("../controllers/authController")
const router = Router()

router.post("/", authenticateUsuario)

module.exports = router