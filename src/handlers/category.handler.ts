import { Request, Response } from "express";
import Category from "../models/Category.Model";

export const getCategoryHandler = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query
  
    try {
      const skip = (Number(page) - 1) * Number(limit)
  
      const [categories, total] = await Promise.all([
        Category.find()
          .skip(Number(limit) === 0 ? 0 : skip)
          .limit(Number(limit) === 0 ? 0 : Number(limit)),
        Category.countDocuments()
      ])
  
      res.json({
        data: categories,
        total,
        currentPage: Number(page)
      })
    } catch (e) {
      res.status(500).json({ error: 'Error al obtener las categorías' })
    }
  }

export const postCreateCategoryHandler = async (req: Request, res: Response) => {
    try {

        const { code } = req.body

        const existCategory = await Category.findOne({ code: code })

        if (existCategory) {
            res.send(`Ya existe la categoria ${code}`)
            return
        }

        const category = Category.create(req.body)

        if (category) {
            res.status(201).send('Categoria Creada Correctamente')
        }

        //console.log(req.body)
    } catch (e) {
        const error = new Error('Error al crear la categoria')
        res.status(500).json({ error: error })
    }
}

export const putUpdateCategoryHandler = async (req: Request, res: Response) => {
    const { id } = req.params

    const updateData = req.body

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
            //me trae los cambios nuevos
            new: true,
            // Activa las validaciones del esquema ante mongo
            runValidators: true
        })

        if (!updatedCategory) {
            res.status(404).json({ message: "Categoria no encontrado." });
            return
        }

        res.status(200).send('Categoria actualizado correctamente.')
        return

    } catch (e) {
        const error = new Error('Error al actualizar el Categoria')
        res.status(500).json({ error: error })
    }
    //console.log(id)
}

export const deleteCategoryHandler = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const deletedCategory = await Category.findByIdAndDelete(id)

        if (!deletedCategory) {
            res.status(404).send('Categoria no encontrada.')
            return
        }

        res.status(200).send('Categoria eliminada correctamente.')
        return

    } catch (e) {
        const error = new Error('Error al eliminar la categoria.')
        res.status(500).json({ error: error })
    }
}