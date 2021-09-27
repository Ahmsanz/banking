import { TransactionInterface } from '../../interfaces/transaction.interface';
import { Request, Response } from 'express';
import { TransactionSchema } from '../schemas/transaction.schema';
import { model } from 'mongoose';
import { findAccountDetails, updateAccountsFunds } from '../services/account.service';
import { getBankResult, saveToCSV } from '../services/transaction.service';

const Transaction = model('transaction', TransactionSchema);

export const createTransaction = async (req: Request, res: Response): Promise<Response<TransactionInterface> | Response<string>>=> {
    try {
        let { senderAccount, receiverAccount, amount }: TransactionInterface = req.body;

        senderAccount = await findAccountDetails(senderAccount as unknown as string);
        receiverAccount = await findAccountDetails(receiverAccount as unknown as string);

        if (senderAccount.funds < amount) {
            return res.status(403).send('Insufficient funds in the selected account.')
        }

        const newTransaction = new Transaction({
            sender: senderAccount.owner,
            receiver: receiverAccount.owner,
            senderAccount,
            receiverAccount,
            amount,
            operationDate: new Date(),            
        });

        const transactionSaved = await Transaction.create(newTransaction);

        saveToCSV();

        await updateAccountsFunds(senderAccount, receiverAccount, amount);

        return res.status(201).send(transactionSaved);
    } catch (err) {
        throw err;
    }
}

export const readAllTransactions = async (req: Request, res: Response): Promise<Response<TransactionInterface[]>> => {    
    try {
        const { query } = req;
        const transactions = await Transaction.find({query});
        
        return res.status(200).send(transactions);
    } catch (err) {
        throw err;
    }    
}

export const deleteTransaction = async (req: Request, res: Response): Promise<Response<string>> => {
    try {
        const { _id } = req.params;

        await Transaction.findByIdAndRemove(_id);

        return res.status(204).send('Transaction deleted');
    } catch (err) {
        throw err;
    }    
}

export const getBankReport = async (req: Request, res: Response): Promise<Response<object>> => {
    try {
        const result = await getBankResult();

        return res.status(201).send(result);
    } catch (err) {
        throw err;
    }
}