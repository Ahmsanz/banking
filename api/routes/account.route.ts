import express from "express";
import { createAccount, deleteAccount, readAllAccounts, updateAccount } from '../controllers/account.controller';


const accountRouter = express()

accountRouter.post('/', createAccount);

accountRouter.get('/', readAllAccounts);

accountRouter.put('/:_id', updateAccount);

accountRouter.delete('/:_id', deleteAccount);

export default accountRouter;