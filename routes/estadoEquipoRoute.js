const { Router } = require("express")
const {createEstadoEquipo, getEstadoEquipos, updateEstadoEquipoByID} = require("../controllers/estadoEquipoController")
const router = Router()

router.post("/", createEstadoEquipo)
router.get("/", getEstadoEquipos)
router.put('/:id', updateEstadoEquipoByID)

module.exports = router