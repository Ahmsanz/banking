import { Schema } from 'mongoose';

export const Connection: Schema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        contact: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'deleted'],
            required: true,
        },
        receiverAccount: {
            type: Schema.Types.ObjectId,
            ref: 'account',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        connectionDate: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true }
)