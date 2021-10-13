import { Request, Response } from 'express';
import { ConnectionSchema } from '../schemas/connection.schema';
import { model } from 'mongoose';
import { findAccountDetailsByNumber } from '../services/account.service';
import { ConnectionInterface, StatusEnum } from '../../interfaces/connection.interface';
import { UserInterface } from '../../interfaces/user.interface';


const Connection = model('connection', ConnectionSchema);

export const createConnection = async (req: Request, res: Response): Promise<Response<ConnectionInterface>> => {
    try {
        const { receiver }: {receiver: number} = req.body;
        const receiverAccount = await findAccountDetailsByNumber(receiver);
        const newConnection = new Connection({
            owner: req.body.user._doc._id,
            contact: receiverAccount.owner,
            receiverAccount,
            status: StatusEnum.pending,
            connectionDate: new Date()
        });

        const connectionSaved = await Connection.create(newConnection);

        return res.status(201).send(connectionSaved);
    } catch (err) {
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
    }
}

export const readAllConnections = async (req: Request, res: Response): Promise<Response<ConnectionInterface[]>> => {    
    try {
        const { query } = req;
        const connections = await Connection.find({query})
            .populate(['owner', 'contact', 'receiverAccount']);
        
        return res.status(200).send(connections);
    } catch (err) {
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
    }    
}

export const listContacts = async (req: Request, res: Response): Promise<Response<UserInterface[]>> => {
    try {
        const connections = await Connection.find({owner: req.body.user._doc._id })
            .populate(['owner', 'contact', 'receiverAccount']) as unknown  as ConnectionInterface[];
            
        const contacts = connections.map( connection => {
            return { 
                firstName: connection.contact.firstName,
                lastName: connection.contact.lastName,
                age: connection.contact.age
            }            
        });
        
        return res.status(200).send(contacts);
    } catch (err) {
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
    }
}

export const acceptConnection = async (req: Request, res: Response): Promise<Response<string>> => {
    try {
        const { _id } = req.params;

        await Connection.findByIdAndUpdate(_id, {status: StatusEnum.accepted});

        return res.status(201).send('Connection confirmed');
    } catch (err) {
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
    }
}

export const deleteConnection = async (req: Request, res: Response): Promise<Response<string>> => {
    try {
        const { _id } = req.params;

        await Connection.findByIdAndRemove(_id);

        return res.status(204).send('Connection deleted');
    } catch (err) {
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
    }    
}