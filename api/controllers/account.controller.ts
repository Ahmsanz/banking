import { AccountInterface } from '../../interfaces/account.interface';
import { Request, Response } from 'express';
import { AccountSchema } from '../schemas/account.schema';
import { model } from 'mongoose';
import { accountNumberAssigner } from '../services/account.service';

const Account = model('account', AccountSchema);
export const createAccount = async (req: Request, res: Response): Promise<Response<AccountInterface[]>> => {
    try {
        const { owner, funds }: AccountInterface = req.body;
        const newAccount = new Account({
            owner,
            number: accountNumberAssigner(),
            funds,
            opened: new Date()
        });

        const accountSaved = await Account.create(newAccount);

        return res.status(201).send(accountSaved);
    } catch (err) {
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
    }
}

export const readAllAccounts = async (req: Request, res: Response): Promise<Response<AccountInterface[]>> => {    
    try {
        const { query } = req;
        const accounts = await Account.find({...query, owner: req.body.user._doc._id})
            .populate('owner');
        
        return res.status(200).send(accounts);
    } catch (err) {
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
    }    
}

export const updateAccount = async (req: Request, res: Response): Promise<Response<AccountInterface>> => {
    try {
        const { _id } = req.params;
        const existingAccount = Account.findById(_id);
        if (!existingAccount) return res.status(404).send('The specified account does not exist. Try a different account.');

        const { funds } = req.body;

        const updatedAccount = await Account.findByIdAndUpdate(_id , { funds });

        return res.status(204).send(updatedAccount);
    } catch (err) {
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
    }
}

export const deleteAccount = async (req: Request, res: Response): Promise<Response<string>> => {
    try {
        const { _id } = req.params;
    
        await Account.findByIdAndRemove(_id);

        return res.status(204).send('Account deleted');
    } catch (err) {
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
    }    
}