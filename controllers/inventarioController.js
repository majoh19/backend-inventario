const Inventario = require("../models/inventario")
const { request, response } = require("express")
const Usuario = require("../models/usuario")
const Marca = require("../models/marca")
const EstadoEquipo = require("../models/estadoEquipo")
const TipoEquipo = require("../models/tipoEquipo")

//crear
const createInventario = async (req = request, res = response) => {
    try {
        const data = req.body
        console.log(data)
        const { usuario, marca, estadoEquipo, tipoEquipo } = data
        //valdacion usuario
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
        if (!estadoEquipo) {
            return res.status(400).json({ msg: 'Estado invalido' })
        }
        //validacion tipoEquipo
        const tipoEquipoDB = TipoEquipo.findOne({ _id: tipoEquipo._id, estado: true })
        if (!tipoEquipo) {
            return res.status(400).json({ msg: 'Tipo invalido' })
        }

        const inventario = new Inventario(data)
        await inventario.save()

        return res.status(201).json(inventario)
    } catch (e) {
        return res.status(500).json({ msg: "Error general" + e })
    }
}

//listar
const getInventarios = async (req = request, res = response) => {
    try {
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
    } catch (e) {
        return res.status(500).json({ msg: "Error general" + e })
    }
}

//editar
const updateInventarioByID = async (req = request, res = response) => {
    try{
        const {id} = req.params
        const data = req.body
        data.fechaActualizacion = new Date()
        const inventario = await Inventario.findByIdAndUpdate(id, data, {new: true})
        return res.status(201).json(inventario)
    }catch(e){
        return res.status(500).json({msg: "Error general" + e})
    }
}

module.exports = { createInventario, getInventarios, updateInventarioByID }