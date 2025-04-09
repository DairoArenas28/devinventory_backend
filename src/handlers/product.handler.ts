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

export const postCreateProductHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { code } = req.body;

        const existProduct = await Product.findOne({ code });

        if (existProduct) {
            res.status(400).json({ error: `Ya existe el producto ${code}` });
            return;
        }

        const product = await Product.create(req.body);

        res.status(201).json({ message: 'Producto creado correctamente', product });
    } catch (e) {
        console.error('Error en postCreateProductHandler:', e);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

export const putUpdateProductHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const { code } = req.body;

    const existProduct = await Product.findOne({ code, _id: { $ne: id } });

    if (existProduct) {
        res.status(400).json({ error: `Ya existe el producto ${code}` });
        return;
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            res.status(404).json({ error: "Producto no encontrado." });
            return;
        }

        res.status(200).json({ message: 'Producto actualizado correctamente.' });
    } catch (e: any) {
        console.error('Error al actualizar producto:', e);
        res.status(500).json({
            error: e.message || 'Error al actualizar el producto'
        });
    }
};

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