const { param, body, validationResult } = require('express-validator')

const updateValidator = [
    param('user_id').notEmpty().withMessage('Debes pasar un ID').isInt().withMessage('Debe ser un entero'),
    (req, res, next) => {

        const errors = validationResult(req).mapped()
        console.log(Object.keys(errors))
        if (Object.keys(errors).length) {
            res.send(errors)
        } else {
            next()
        }

    }
]

/**
 * nombre
 * apellidos
 * telefono
 * email 
 * imagen
 */

const addValidator = [

    body('picture')
        .notEmpty().withMessage('Debes ingresar un Foto')
        .isURL().withMessage('Debe ser un URL'),

    // body('role')
    //     .notEmpty().withMessage('Agrega el Role')
    //     .isIn(['admin', 'guest', 'customer'])
    //     .withMessage('Debe ser un rol correcto')
    // ,

    body('usermane')
        .notEmpty().withMessage('Agrega el Nombre de usuario'),
        body('email').notEmpty().withMessage('Agrega Tu email').isEmail().withMessage('Formato Incorrecto'),

    (req, res, next) => {

        const errors = validationResult(req).mapped()

        if (Object.keys(errors).length) {
            res.status(400).send(errors)
        } else {
            next()
        }

    }
]


const UsersValidatorCollection = {
    updateValidator,
    addValidator
}


module.exports = {
    UsersValidatorCollection
}