import express from "express";
import { createTransaction, deleteTransaction, getBankReport, readAllTransactions } from '../controllers/transaction.controller';
import { authenticateToken } from "../services/user.service";


const transactionRouter = express();

transactionRouter.post('/',authenticateToken, createTransaction);

transactionRouter.get('/', authenticateToken, readAllTransactions);

transactionRouter.get('/bank', getBankReport);

transactionRouter.delete('/:_id', authenticateToken, deleteTransaction);

export default transactionRouter;