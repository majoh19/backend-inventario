const jwt = require('jsonwebtoken')

const validarRolAdmin = (req, res, next) => {
    
    if(req.payload.rol != 'ADMIN') {
        
    }
}