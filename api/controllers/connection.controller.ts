import { Request, Response } from 'express';
import { ConnectionSchema } from '../schemas/connection.schema';
import { model } from 'mongoose';
import { findAccountDetailsByNumber } from '../services/account.service';
import { ConnectionInterface, StatusEnum } from '../../interfaces/connection.interface';


const Connection = model('connection', ConnectionSchema);

export const createConnection = async (req: Request, res: Response): Promise<Response<ConnectionInterface>> => {
    try {
        const { receiver }: {receiver: number} = req.body;
        const receiverAccount = await findAccountDetailsByNumber(receiver);
        const newConnection = new Connection({
            owner: '61519287363601b3518e6ec5', //TODO: find from token
            contact: receiverAccount.owner,
            receiverAccount,
            status: StatusEnum.pending,
            connectionDate: new Date()
        });

        const connectionSaved = await Connection.create(newConnection);

        return res.status(201).send(connectionSaved);
    } catch (err) {
        throw err;
    }
}

export const readAllConnections = async (req: Request, res: Response): Promise<Response<ConnectionInterface[]>> => {    
    try {
        const { query } = req;
        const connections = await Connection.find({query})
            .populate(['owner', 'contact', 'receiverAccount']);
        
        return res.status(200).send(connections);
    } catch (err) {
        throw err;
    }    
}

export const deleteConnection = async (req: Request, res: Response): Promise<Response<string>> => {
    try {
        const { _id } = req.params;

        await Connection.findByIdAndRemove(_id);

        return res.status(204).send('Connection deleted');
    } catch (err) {
        throw err;
    }    
}