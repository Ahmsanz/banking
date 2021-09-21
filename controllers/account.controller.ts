import { AccountInterface } from '../interfaces/account.interface';
import { Request, Response } from 'express';
import { AccountSchema } from '../schemas/account.schema';
import { model } from 'mongoose';

const Account = model('account', AccountSchema);
exports.create = (req: Request, res: Response) => {
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

exports.readAll = (req: Request, res: Response) => {
    try {
        const { query } = req;
        const accounts = Account.find({query});

        return res.status(200).send(accounts);
    } catch (err) {
        throw err;
    }    
}

exports.update = (req: Request, res: Response) => {
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

exports.delete = (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
    
        Account.deleteOne({_id});

        return res.status(204).send('Account deleted');
    } catch (err) {
        throw err;
    }    
}