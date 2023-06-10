const Usuario = require("../models/usuario");
const { request, response } = require("express");
const { validationResult, check } = require("express-validator");
const bycript = require("bcryptjs");
const { validarJWT } = require('../middleware/validarJWT')

//crear
const createUsuario = async (req = request, res = response, next) => {
    try {
        // Validacion JWT
        validarJWT(req, res, async () => {
            // Validar request body
            await Promise.all([
                check("nombre", "invalid.nombre").not().isEmpty().run(req),
                check("email", "invalid.email").isEmail().run(req),
                check("rol", "invalid.rol").isIn(["ADMIN", "DOCENTE"]).run(req),
                check("contrasena", "invalid.contrasena").not().isEmpty().run(req)
            ]);

            // Verificar errores de validacion
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const email = req.body.email;
            const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : "";
            const rol = req.body.rol ? req.body.rol.toUpperCase() : "";
            const salt = bycript.genSaltSync();
            const contrasena = bycript.hashSync(req.body.contrasena, salt);
            const usuarioDB = await Usuario.findOne({ nombre, email });
            if (usuarioDB) {
                return res.status(400).json({ msg: "Ya existe" });
            }

            const data = {
                nombre,
                email,
                rol,
                contrasena,
            };
            const usuario = new Usuario(data);
            console.log(usuario);
            await usuario.save();
            return res.status(201).json(usuario);
        });
    } catch (e) {
        return res.status(500).json({
            msg: "Error general" + e,
        });
    }
};

const getUsuarios = async (req = request, res = response, next) => {
    try {
        // Validacion JWT
        validarJWT(req, res, async () => {
            const { estado } = req.query;
            const usuariosDB = await Usuario.find({ estado });
            return res.json(usuariosDB);
        });
    } catch (e) {
        return res.status(500).json({
            msg: "Error general" + e,
        });
    }
};



//editar
const updateUsuarioByID = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date();
        const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true });
        return res.status(201).json(usuario);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msj: "Error" });
    }
};

module.exports = { createUsuario, getUsuarios, updateUsuarioByID };
