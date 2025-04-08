import { body } from "express-validator";

export const productValidator = () => [
    body('code')
        .notEmpty()
        .withMessage('El código del producto es obligatorio'),

    body('name')
        .notEmpty()
        .withMessage('El nombre del producto es obligatorio'),

    body('description')
        .optional()
        .isString()
        .withMessage('La descripción debe ser un texto'),

    body('category_id')
        .notEmpty()
        .withMessage('La categoría es obligatoria')
        .isMongoId()
        .withMessage('El ID de categoría no es válido'),

    body('brand')
        .optional()
        .isString()
        .withMessage('La marca debe ser un texto'),

    body('price')
        .notEmpty()
        .withMessage('El precio es obligatorio')
        .isNumeric()
        .withMessage('El precio debe ser un número'),

    body('stock')
        .notEmpty()
        .withMessage('El stock es obligatorio')
        .isInt({ min: 0 })
        .withMessage('El stock debe ser un número entero no negativo'),
];

/*export const updateProductValidator = () => [
    body('code')
        .notEmpty()
        .withMessage('Product code is required'),

    body('name')
        .notEmpty()
        .withMessage('Product name is required'),

    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),

    body('category_id')
        .notEmpty()
        .withMessage('Category is required')
        .isMongoId()
        .withMessage('Invalid category ID'),

    body('brand')
        .optional()
        .isString()
        .withMessage('Brand must be a string'),

    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isNumeric()
        .withMessage('Price must be a valid number'),

    body('stock')
        .notEmpty()
        .withMessage('Stock is required')
        .isInt({ min: 0 })
        .withMessage('Stock must be a non-negative integer'),
];*/