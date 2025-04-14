import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    code: string;
    customer_id: Schema.Types.ObjectId;
    date: Date;
    status: string;
    total: number;
    payment_method: string;
    shipping_address: string;
    notes: string;
    created_at: Date;
    updated_at: Date;
}

const orderSchema = new Schema<IOrder>({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'paid', 'shipped', 'cancelled', 'delivered'],
        default: 'pending',
    },
    total: {
        type: Number,
        required: true,
        default: 0,
    },
    payment_method: {
        type: String,
        required: true,
        enum: ['cash', 'credit_card', 'paypal', 'bank_transfer'],
    },
    shipping_address: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        default: '',
    }
});

// Optional: Add a pre-save hook to update the `updated_at` field
orderSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order
