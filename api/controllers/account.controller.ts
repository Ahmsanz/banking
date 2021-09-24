import { AccountInterface } from '../../interfaces/account.interface';
import { Request, Response } from 'express';
import { AccountSchema } from '../schemas/account.schema';
import { model } from 'mongoose';

const Account = model('account', AccountSchema);
export const createAccount = (req: Request, res: Response) => {
    try {
        const { owner, number, funds }: AccountInterface = req.body;
        const newAccount = new Account({
            owner,
            number,
            funds
        });

        Account.create(newAccount);

        return res.status(201).send('New account has been created');
    } catch (err) {
        throw err;
    }
}

export const readAllAccounts = (req: Request, res: Response) => {    
    try {
        console.log('reaching account endpoint')
        const { query } = req;
        const accounts = Account.find({query});
        console.log(accounts)
        return res.status(200)
    } catch (err) {
        throw err;
    }    
}

export const updateAccount = (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        const existingAccount = Account.findById(_id);
        if (!existingAccount) return res.status(404).send('The specified account does not exist. Try a different account.');

        const { funds } = req.body;

        const updatedAccount = Account.updateOne({ _id }, { funds });

        return res.status(204).send(updatedAccount);
    } catch (err) {
        throw err;
    }
}

export const deleteAccount = (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
    
        Account.deleteOne({_id});

        return res.status(204).send('Account deleted');
    } catch (err) {
        throw err;
    }    
}