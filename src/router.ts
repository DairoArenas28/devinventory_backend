import { Router } from "express";
import { deleteProductHandler, getProductHandler, postCreateProductHandler, putUpdateProductHandler } from "./handlers/product.handler";
import { deleteCategoryHandler, getCategoryHandler, postCreateCategoryHandler, putUpdateCategoryHandler } from "./handlers/category.handler";
import { deleteInventoryMovementHandler, getInventoryHandler, postCreateInventoryMovementHandler, putUpdateInventoryMovementHandler } from "./handlers/inventory.movement.handler";
import { productValidator } from "./validator/product.validator";
import { handleInputError } from "./middleware/validation";
import { body } from "express-validator";
import { createAccount, getUser, login } from "./handlers/user.handler";
import { authenticate } from "./middleware/auth";

const router = Router()

router.post('/auth/login', handleInputError, login)

router.post('/auth/register' , handleInputError, createAccount)

router.get('/user', authenticate, getUser)

//Producto 

router.get('/product', authenticate, getProductHandler)

router.post('/product', authenticate, productValidator(), handleInputError, postCreateProductHandler)

router.put('/product/:id', authenticate, productValidator(), handleInputError, putUpdateProductHandler)

router.delete('/product/:id', authenticate, deleteProductHandler)

//Categoria

router.get('/category', authenticate, getCategoryHandler)

router.post('/category', authenticate, postCreateCategoryHandler)

router.put('/category/:id', authenticate, putUpdateCategoryHandler)

router.delete('/category/:id', authenticate, deleteCategoryHandler)


//Ordenes 

router.get('/order', authenticate, getInventoryHandler)



//Movimiento

router.get('/categorymovement', authenticate, getInventoryHandler)

router.post('/categorymovement', authenticate, postCreateInventoryMovementHandler)

router.put('/categorymovement/:id', authenticate, putUpdateInventoryMovementHandler)

router.delete('/categorymovement/:id', authenticate, deleteInventoryMovementHandler)

export default router