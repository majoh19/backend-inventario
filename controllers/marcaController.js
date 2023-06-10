const Marca = require("../models/marca")
const { request, response } = require("express")
const { validationResult, check } = require("express-validator")
const { validarJWT } = require("../middleware/validarJWT")
const { validarRolAdmin } = require("../middleware/validarRolAdmin")

//crear
const createMarca = async (req = request, res = response) => {
    try {
        // Validar request body
        await Promise.all([
            check("nombre", "invalid.nombre").not().isEmpty().run(req)
        ])

        // Verificar errores de validacion
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Validar JWT y RolAdmin
        validarJWT(req, res, () => {
            validarRolAdmin(req, res, async () => {
                const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : ""
                const data = {
                    nombre
                }
                const marca = new Marca(data)
                console.log(marca)
                await marca.save()
                return res.status(201).json(marca)
            })
        })
    } catch (e) {
        return res.status(500).json({
            msg: "Error general" + e
        })
    }
}

//listar
const getMarcas = async (req = request, res = response) => {
    try {
        // Validar JWT y RolAdmin
        validarJWT(req, res, () => {
            validarRolAdmin(req, res, async () => {
                const { estado } = req.query
                const marcasDB = await Marca.find({ estado })
                return res.json(marcasDB)
            })
        })
    } catch (e) {
        return res.status(500).json({
            msg: "Error general" + e
        })
    }
}

//editar
const updateMarcaByID = async (req = request, res = response) => {
    try {
        // Validar JWT y RolAdmin
        validarJWT(req, res, () => {
            validarRolAdmin(req, res, async () => {
                const { id } = req.params
                const data = req.body
                data.fechaActualizacion = new Date()
                const marca = await Marca.findByIdAndUpdate(id, data, { new: true })
                return res.status(201).json(marca)
            })
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msj: 'Error' })
    }
}

module.exports = { createMarca, getMarcas, updateMarcaByID }