import { Request, Response } from "express";
import Product from "../models/Product.Model";

export const getProductHandler = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const skip = (Number(page) - 1) * Number(limit);

        const [products, total] = await Promise.all([
            Product.find()
                .skip(skip)
                .limit(Number(limit))
                .populate('category_id', 'name'),
            Product.countDocuments() // total de productos sin paginar
        ]);

        res.json({
            data: products,
            total,
            currentPage: Number(page),
        });
    } catch (e) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

export const postCreateProductHandler = async (req: Request, res: Response) => {
    try {

        const { code } = req.body

        const existProduct = await Product.findOne({ code: code })

        if (existProduct) {
            res.send(`Ya existe el producto ${code}`)
            return
        }

        const product = Product.create(req.body)

        if (product) {
            res.status(201).send('Producto Creado Correctamente')
        }

        //console.log(req.body)
    } catch (e) {
        const error = new Error('Error al crear referencia')
        res.status(500).json({ error: error })
    }
}

export const putUpdateProductHandler = async (req: Request, res: Response) => {
    const { id } = req.params

    const updateData = req.body

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
            //me trae los cambios nuevos
            new: true,
            // Activa las validaciones del esquema ante mongo
            runValidators: true
        })

        if (!updatedProduct) {
            res.status(404).json({ message: "Producto no encontrado." });
            return
        }

        res.status(200).send('Producto actualizado correctamente.')
        return

    } catch (e) {
        const error = new Error('Error al actualizar el producto')
        res.status(500).json({ error: error })
    }
    //console.log(id)
}

export const deleteProductHandler = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) {
            res.status(404).send('Producto no encontrado.')
            return
        }

        res.status(200).send('Producto eliminado correctamente.')
        return

    } catch (e) {
        const error = new Error('Error al eliminar el producto')
        res.status(500).json({ error: error })
    }
}