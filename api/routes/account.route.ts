import express from "express";
import { createAccount, deleteAccount, readAllAccounts, updateAccount } from '../controllers/account.controller';


const accountRouter = express()

accountRouter.post('/', createAccount);

accountRouter.get('/', readAllAccounts);

accountRouter.put('/:id', updateAccount);

accountRouter.delete('/:id', deleteAccount);

export default accountRouter;