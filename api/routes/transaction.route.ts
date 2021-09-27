import express from "express";
import { createTransaction, deleteTransaction, getBankReport, readAllTransactions } from '../controllers/transaction.controller';


const transactionRouter = express()

transactionRouter.post('/', createTransaction);

transactionRouter.get('/', readAllTransactions);

transactionRouter.get('/bank', getBankReport);

transactionRouter.delete('/:_id', deleteTransaction);

export default transactionRouter;