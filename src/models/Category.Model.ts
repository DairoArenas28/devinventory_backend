import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    code: string
    name: string
    description: string
    inactive: boolean
    created_at: Date
    updated_at: Date
}

const categorySchema = new Schema<ICategory>(
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

        inactive: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true // auto-gestiona createdAt y updatedAt
    }
)

const Category = mongoose.model<ICategory>('Category', categorySchema)

export default Category