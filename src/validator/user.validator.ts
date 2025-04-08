import { body } from "express-validator";

export const productValidator = () => [
    body('email')
        .isEmail()
        .withMessage('E-mail no válido'),

    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),

]