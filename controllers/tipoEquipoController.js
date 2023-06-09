const TipoEquipo = require("../models/tipoEquipo")
const { request, response } = require("express")

//crear
const createTipoEquipo = async (req = request, res = response) => {
    try {
        const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : ""
        const tipoEquipoDB = await TipoEquipo.findOne({ nombre })
        if (tipoEquipoDB) {
            return res.status(400).json({ msg: "Ya existe" })
        }
        const data = {
            nombre
        }
        const tipoEquipo = new TipoEquipo(data)
        console.log(tipoEquipo)
        await tipoEquipo.save()
        return res.status(201).json(tipoEquipo)
    } catch (e) {
        return res.status(500).json({
            msg: "Error general" + e
        })
    }
}

//listar
const getTipoEquipos = async (req = request, res = response) => {
    try {
        const {estado} = req.query
        const tipoEquiposDB = await TipoEquipo.find({estado}) //estado: estado = estado
        return res.json(tipoEquiposDB)
    } catch (e) {
        return res.status(500).json({
            msg: "Error general" + e
        })
    }
}

//editar
const updateTipoEquipoByID = async (req = request, res = response) => {
    try {
      const { id } = req.params
      const data = req.body
      data.fechaActualizacion = new Date()
      const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, { new: true })
      return res.status(201).json(tipoEquipo)
    } catch (e) {
      console.log(e)
      return res.status(500).json({ msj: 'Error' })
    }
  }

module.exports = { createTipoEquipo, getTipoEquipos, updateTipoEquipoByID }
