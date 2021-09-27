import express from "express";
import { createTransaction, deleteTransaction, getBankReport, readAllTransactions } from '../controllers/transaction.controller';
import { checkConnection } from "../services/connection.service";
import { authenticateToken } from "../services/user.service";


const transactionRouter = express();

transactionRouter.post('/',authenticateToken, checkConnection, createTransaction);

transactionRouter.get('/', authenticateToken, readAllTransactions);

transactionRouter.get('/bank', getBankReport);

transactionRouter.delete('/:_id', authenticateToken, deleteTransaction);

export default transactionRouter;