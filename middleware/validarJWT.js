const jwt = require('jsonwebtoken')

const validarJWT = (req, res, next) => {

    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({ msg: "Error unauthorized" })
    }

    try {

        const payload = jwt.verify(token, '123456')
        req.payload = payload
        next()

    } catch (e) {
        return res.status(500).json({
            msg: "Error general" + e,
        })
    }
}

module.exports = { validarJWT }