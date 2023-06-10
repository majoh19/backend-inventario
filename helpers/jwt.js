const jwt = require('jsonwebtoken')
const usuario = require('../models/usuario')

const generarJWT = (usuario) => {

    const payload = { 
        _id: usuario._id, 
        nombre: usuario.nombre, 
        email: usuario.email, 
        contrasena: usuario.contrasena, 
        rol: usuario.rol 
    }

    const token = jwt.sign(payload, '123456', { expiresIn: '1h' })
    return token
}

module.exports = { generarJWT }