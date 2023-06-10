const jwt = require('jsonwebtoken')

const validarRolAdmin = (req, res, next) => {
    
    if(req.payload.rol != 'ADMIN') {
        return res.status(401).json({ msg: "Error unauthorized" })
    }
    next()
}

module.exports = { validarRolAdmin }