const EstadoEquipo = require("../models/estadoEquipo")
const { request, response } = require("express")

//crear
const createEstadoEquipo = async (req = request, res = response) => {
    try {
        const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : ""
        const estadoEquipoDB = await EstadoEquipo.findOne({ nombre })
        if (estadoEquipoDB) {
            return res.status(400).json({ msg: "Ya existe" })
        }
        const data = {
            nombre
        }
        const estadoEquipo = new EstadoEquipo(data)
        console.log(estadoEquipo)
        await estadoEquipo.save()
        return res.status(201).json(estadoEquipo)
    } catch (e) {
        return res.status(500).json({
            msg: "Error general" + e
        })
    }
}

//listar
const getEstadoEquipos = async (req = request, res = response) => {
    try {
        const {estado} = req.query
        const estadoEquiposDB = await EstadoEquipo.find({estado})
        return res.json(estadoEquiposDB)
    } catch (e) {
        return res.status(500).json({
            msg: "Error general" + e
        })
    }
}

//editar
const updateEstadoEquipoByID = async (req = request, res = response) => {
    try {
      const { id } = req.params
      const data = req.body
      data.fechaActualizacion = new Date()
      const estadoEquipo = await EstadoEquipo.findByIdAndUpdate(id, data, { new: true })
      return res.status(201).json(estadoEquipo)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ msj: 'Error' })
    }
  }

module.exports = { createEstadoEquipo, getEstadoEquipos, updateEstadoEquipoByID }