import { body } from "express-validator";

export const loginValidator = () => [
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),

    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),

]

export const createUserValidator = () => [
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),

    body('name')
        .notEmpty()
        .withMessage('EL nombre no puede ir vacio'),

    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('El password es muy corto, mínimo 8 caracteres')
]