import { Schema } from 'mongoose';

export const Transaction: Schema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        senderAccount: {
            type: Schema.Types.ObjectId,
            ref: 'account',
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
        operationDate: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true }
)