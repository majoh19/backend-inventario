const { Schema, model } = require('mongoose')

const InventarioSchema = Schema({
    serial:{
        type: String,
        required: [true, 'Serial requerido'],
        unique: [true, 'Equipo registrado']
    },
    modelo: {
        type: String,
        require: [true, 'Modelo requerido'],
        unique: [true, 'Modelo debe ser único']
    },
    descripcion: {
        type: String
    },
    foto: {
        type: String
    },
    color: {
        type: String
    },
    fechaCompra: {
        type: Date
    },
    precio: {
        type: Number
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        required: true
    },
    estadoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoEquipo',
        required: true
    },
    tipoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'TipoEquipo',
        required: true
    }
})

module.exports = model('Inventario', InventarioSchema)