const express = require('express');
const router = express.Router();

const db = require('../db');

router.post('/', (req, res) => {

    const {
        usuario,
        correo,
        password,
        rol_id
    } = req.body;

    // VALIDACIÓN
    if (!usuario || !password) {
        return res.status(400).json({
            error: 'Usuario y contraseña requeridos'
        });
    }

    // SQL
    const sql = `
        INSERT INTO usuarios
        (usuario, correo, password, rol_id)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [usuario, correo, password, rol_id],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    error: 'Error al crear usuario'
                });
            }

            res.json({
                mensaje: 'Usuario creado correctamente'
            });

        }
    );

});

module.exports = router;