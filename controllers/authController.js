const Usuario = require("../models/usuario");
const { request, response } = require("express");
const { validationResult, check } = require("express-validator");
const bycript = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

//autenticar
const authenticateUsuario = async (req = request, res = response) => {
  try {
    //Validar request body
    await Promise.all([
      check("email", "invalid.email").isEmail().run(req),
      check("contrasena", "invalid.contrasena").not().isEmpty().run(req),
    ]);

    //Verificar errores de validacion
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    const contrasena = req.body.contrasena;
    const esIgual = bycript.compareSync(contrasena, usuarioDB.contrasena);
    if (!esIgual) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    //generar token
    const token = generarJWT(usuarioDB)
    res.json({ _id: usuarioDB._id, nombre: usuarioDB.nombre, rol: usuarioDB.rol, email: usuarioDB.email, access_token: token })
    
  } catch (e) {
    return res.status(500).json({
      msg: "Error general" + e,
    });
  }
};

module.exports = { authenticateUsuario };
