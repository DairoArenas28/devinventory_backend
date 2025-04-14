import mongoose, { Schema, Document } from "mongoose";

export interface IOrderDetail extends Document {
    order_id: Schema.Types.ObjectId;
    product_id: Schema.Types.ObjectId;
    quantity: number;
    unit_price: number;
    subtotal: number;
}

const orderDetailSchema = new Schema<IOrderDetail>({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    unit_price: {
        type: Number,
        required: true,
        min: 0,
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0,
    }
});

const OrderDetail = mongoose.model<IOrderDetail>('OrderDetail', orderDetailSchema);

export default OrderDetail
