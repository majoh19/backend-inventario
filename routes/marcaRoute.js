const { Router } = require("express")
const {createMarca, getMarcas, updateMarcaByID} = require("../controllers/marcaController")
const router = Router()

router.post("/", createMarca)
router.get("/", getMarcas)
router.put("/:id", updateMarcaByID)

module.exports = router