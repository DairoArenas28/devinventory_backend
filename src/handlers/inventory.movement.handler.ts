import { Request, Response } from "express";
import CategoryMovement from "../models/Inventory.Movement.Model";

export const getInventoryHandler = async (req: Request, res: Response) => {
    try {
        const products = await CategoryMovement.find()
        res.json(products)
    } catch (e) {
        res.status(500).json({error: 'Error al obtener los movimientos'})
    }
}

export const postCreateInventoryMovementHandler = async (req: Request, res: Response) => {
    try {

        const { code } = req.body

        const existCategoryMoviment = await CategoryMovement.findOne({code: code})

        if(existCategoryMoviment) {
            res.send(`Ya existe el movimiento ${code}`)
            return
        }

        const category = CategoryMovement.create(req.body)

        if(category) {
            res.status(201).send('Movimiento Creado Correctamente')
        }

        //console.log(req.body)
    } catch (e) {
        const error = new Error('Error al crear el movimiento')
        res.status(500).json({error: error})
    }
}

export const putUpdateInventoryMovementHandler = async (req: Request, res: Response) => {
    const { id } = req.params

    const updateData = req.body

    try {
        const updatedCategory = await CategoryMovement.findByIdAndUpdate(id, updateData, {
            //me trae los cambios nuevos
            new: true,
            // Activa las validaciones del esquema ante mongo
            runValidators: true
        })

        if(!updatedCategory){
            res.status(404).json({ message: "Movimiento no encontrado." });
            return 
        }

        res.status(200).send('Movimiento actualizado correctamente.')
        return 

    } catch (e) {
        const error = new Error('Error al actualizar el Movimiento')
        res.status(500).json({error: error})
    }
     //console.log(id)
}

export const deleteInventoryMovementHandler = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const deletedCategoryMovement = await CategoryMovement.findByIdAndDelete(id)

        if(!deletedCategoryMovement){
            res.status(404).send('Movimiento no encontrada.')
            return
        }

        res.status(200).send('Movimiento eliminado correctamente.')
        return

    } catch (e) {
        const error = new Error('Error al eliminar el movimiento.')
        res.status(500).json({error: error})
    }
}