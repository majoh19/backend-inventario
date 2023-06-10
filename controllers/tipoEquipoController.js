const TipoEquipo = require("../models/tipoEquipo")
const { request, response } = require("express")
const { validationResult, check } = require("express-validator")
const { validarJWT } = require("../middleware/validarJWT")
const { validarRolAdmin } = require("../middleware/validarRolAdmin")

//crear
const createTipoEquipo = async (req = request, res = response) => {
    try {
        // Validar request body
        await Promise.all([
            check("nombre", "invalid.nombre").not().isEmpty().run(req)
        ])

        // Verificar errores de validacion
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Validar JWT y RolAdmin
        validarJWT(req, res, () => {
            validarRolAdmin(req, res, async () => {
                const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : ""
                const data = {
                    nombre
                }
                const tipoEquipo = new TipoEquipo(data)
                console.log(tipoEquipo)
                await tipoEquipo.save()
                return res.status(201).json(tipoEquipo)
            })
        })
    } catch (e) {
        return res.status(500).json({
            msg: "Error general" + e
        })
    }
}

//listar
const getTipoEquipos = async (req = request, res = response) => {
    try {
        // Validar JWT y RolAdmin
        validarJWT(req, res, () => {
            validarRolAdmin(req, res, async () => {
                const { estado } = req.query
                const tipoEquiposDB = await TipoEquipo.find({ estado }) //estado: estado = estado
                return res.json(tipoEquiposDB)
            })
        })
    } catch (e) {
        return res.status(500).json({
            msg: "Error general" + e
        })
    }
}

//editar
const updateTipoEquipoByID = async (req = request, res = response) => {
    try {
        // Validar JWT y RolAdmin
        validarJWT(req, res, () => {
            validarRolAdmin(req, res, async () => {
                const { id } = req.params
                const data = req.body
                data.fechaActualizacion = new Date()
                const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, { new: true })
                return res.status(201).json(tipoEquipo)
            })
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msj: 'Error' })
    }
}

module.exports = { createTipoEquipo, getTipoEquipos, updateTipoEquipoByID }
