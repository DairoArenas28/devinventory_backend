import { Request, Response } from "express";
import Order from "../models/OrderModel";

export const getOrder = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query

        const skip = (Number(page) - 1) * Number(limit)

        const [ orders, total ] = await Promise.all([
            Order.find()
                .skip(skip)
                .limit(Number(limit))
                .populate('customer_id'),
            Order.countDocuments()
        ])

        res.json({
            data: orders,
            total: total,
            currentPage: Number(page)
        })
    } catch (e) {
        res.status(500).json({ error: 'Error Fatal: al obtener los productos' });
    }
}