import { model } from "mongoose"
import { ConnectionSchema } from "../schemas/connection.schema"
import { Request, Response, NextFunction } from 'express';
import { findAccountDetails } from './account.service';

const Connection = model('connection', ConnectionSchema);

/**
 * Middleware to authorize transactions between users: they will only succeed if both users are connected to each other
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const checkConnection = async (req: Request, res: Response, next: NextFunction) => {
    let { senderAccount, receiverAccount } = req.body;

    const sender = (await findAccountDetails(senderAccount)).owner;
    const receiver = (await findAccountDetails(receiverAccount)).owner;

    const sharedConnections = await Connection.find({ $or: [{owner: sender, contact: receiver}, {owner: receiver, contact: sender}]});

    if (!sharedConnections.length) return res.status(401).send('Transaction unauthorized. Users must be connected.')

    next();
}