import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    code: string;
    name: string;
    description: string;
    category_id: Schema.Types.ObjectId;
    brand: string;
    price: number;
    stock: number;
    created_at: Date;
    updated_at: Date;
}

const productSchema = new Schema<IProduct>(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            default: ''
        },
        category_id: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        brand: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true // auto-gestiona createdAt y updatedAt
    }
);

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product