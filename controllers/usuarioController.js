const Usuario = require("../models/usuario")
const { request, response } = require("express")

//crear
const createUsuario = async (req = request, res = response) => {
    try {
        const email = req.body.email
        const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : ""
        const usuarioDB = await Usuario.findOne({ nombre, email })
        if (usuarioDB) {
            return res.status(400).json({ msg: "Ya existe" })
        }
        const data = {
            nombre,
            email
        }
        const usuario = new Usuario(data)
        console.log(usuario)
        await usuario.save()
        return res.status(201).json(usuario)
    } catch (e) {
        return res.status(500).json({
            msg: "Error general" + e
        })
    }
}

//listar
const getUsuarios = async (req = request, res = response) => {
    try {
        const {estado} = req.query
        const usuariosDB = await Usuario.find({estado})
        return res.json(usuariosDB)
    } catch (e) {
        return res.status(500).json({
            msg: "Error general" + e
        })
    }
}

//editar
const updateUsuarioByID = async (req = request, res = response) => {
    try {
      const { id } = req.params
      const data = req.body
      data.fechaActualizacion = new Date()
      const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true })
      return res.status(201).json(usuario)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ msj: 'Error' })
    }
  }

module.exports = { createUsuario, getUsuarios, updateUsuarioByID }