import { Schema } from 'mongoose';

export const Account: Schema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        opened: {
            type: Date,
            required: true,
        },
        funds: [{
            type: Number,
            required: false,
            default: 0,
        }]
    },
    { timestamps: true }
)