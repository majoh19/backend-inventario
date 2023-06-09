const { Router } = require("express")
const {createUsuario, getUsuarios, updateUsuarioByID} = require("../controllers/usuarioController")
const router = Router()

router.post("/", createUsuario)
router.get("/", getUsuarios)
router.put("/:id", updateUsuarioByID)

module.exports = router