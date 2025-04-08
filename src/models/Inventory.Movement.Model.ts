import mongoose, { Schema, Document } from "mongoose";

export interface ICategoryMovement extends Document {
    code: string
    date: Date
    movement_type: string
    reference: string
    user_id: Schema.Types.ObjectId
    notes: string
    created_at: Date
    updated_at: Date
}

const categoryMovementSchema = new Schema<ICategoryMovement>(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        date: {
            type: Date,
            required: true
        },
        movement_type: {
            type: String,
            required: true,
            enum: ['IN', 'OUT'], // Puedes personalizar los tipos de movimiento
            uppercase: true
        },
        reference: {
            type: String,
            required: true,
            trim: true
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        notes: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true // auto-gestiona createdAt y updatedAt
    }
)

const CategoryMovement = mongoose.model<ICategoryMovement>('CategoryMovement', categoryMovementSchema)

export default CategoryMovement