const Inventario = require("../models/inventario")
const { request, response } = require("express")
const Usuario = require("../models/usuario")
const Marca = require("../models/marca")
const EstadoEquipo = require("../models/estadoEquipo")
const TipoEquipo = require("../models/tipoEquipo")
const { validationResult, check } = require("express-validator")
const { validarJWT } = require("../middleware/validarJWT")
const { validarRolAdmin } = require("../middleware/validarRolAdmin")

//crear
const createInventario = async (req = request, res = response) => {
    try {
        // Validar request body
        await Promise.all([
            check("serial", "invalid.serial").not().isEmpty().run(req),
            check("modelo", "invalid.modelo").not().isEmpty().run(req),
            check("descripcion", "invalid.descripcion").not().isEmpty().run(req),
            check("foto", "invalid.foto").not().isEmpty().run(req),
            check("color", "invalid.color").not().isEmpty().run(req),
            check("fechaCompra", "invalid.fechaCompra").not().isEmpty().run(req),
            check("precio", "invalid.precio").not().isEmpty().run(req),
            check("usuario", "invalid.usuario").not().isEmpty().run(req),
            check("marca", "invalid.marca").not().isEmpty().run(req),
            check("estadoEquipo", "invalid.estadoEquipo").not().isEmpty().run(req),
            check("tipoEquipo", "invalid.tipoEquipo").not().isEmpty().run(req)
        ])

        // Verificar errores de la validacion
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Validar JWT y RolAdmin
        validarJWT(req, res, () => {
            validarRolAdmin(req, res, async () => {
                const data = req.body
                console.log(data)
                const { usuario, marca, estadoEquipo, tipoEquipo } = data
                //validacion usuario
                const usuarioDB = Usuario.findOne({ _id: usuario._id, estado: true })
                if (!usuarioDB) {
                    return res.status(400).json({ msg: 'Usuario invalido' })
                }
                //validacion marca
                const marcaDB = Marca.findOne({ _id: marca._id, estado: true })
                if (!marcaDB) {
                    return res.status(400).json({ msg: 'Marca invalida' })
                }
                //validacion estadoEquipo
                const estadoEquipoDB = EstadoEquipo.findOne({ _id: estadoEquipo._id, estado: true })
                if (!estadoEquipoDB) {
                    return res.status(400).json({ msg: 'Estado invalido' })
                }
                //validacion tipoEquipo
                const tipoEquipoDB = TipoEquipo.findOne({ _id: tipoEquipo._id, estado: true })
                if (!tipoEquipoDB) {
                    return res.status(400).json({ msg: 'Tipo invalido' })
                }

                const inventario = new Inventario(data)
                console.log(inventario)
                await inventario.save()
                return res.status(201).json(inventario)
            })
        })
    } catch (e) {
        return res.status(500).json({ msg: "Error general" + e })
    }
}

//listar
const getInventarios = async (req = request, res = response) => {
    try {
        // Validar JWT
        validarJWT(req, res, async () => {
            const inventariosDB = await Inventario.find()
                .populate({
                    path: 'usuario',
                    match: { estado: true }
                })
                .populate({
                    path: 'marca',
                    match: { estado: true }
                })
                .populate({
                    path: 'estadoEquipo',
                    match: { estado: true }
                })
                .populate({
                    path: 'tipoEquipo',
                    match: { estado: true }
                })
            return res.json(inventariosDB)
        })
    } catch (e) {
        return res.status(500).json({ msg: "Error general" + e })
    }
}

//editar
const updateInventarioByID = async (req = request, res = response) => {
    try {
        // Validar JWT y RolAdmin
        validarJWT(req, res, () => {
            validarRolAdmin(req, res, async () => {
                const { id } = req.params
                const data = req.body
                data.fechaActualizacion = new Date()
                const inventario = await Inventario.findByIdAndUpdate(id, data, { new: true })
                return res.status(201).json(inventario)
            })
        })
    } catch (e) {
        return res.status(500).json({ msg: "Error general" + e })
    }
}

module.exports = { createInventario, getInventarios, updateInventarioByID }