import express from "express";
import { createConnection, deleteConnection, listContacts, readAllConnections } from '../controllers/connection.controller';
import { checkConnection } from "../services/connection.service";


const connectionRouter = express()

connectionRouter.post('/', createConnection);

connectionRouter.get('/', readAllConnections);

connectionRouter.get('/list', listContacts);

connectionRouter.delete('/:_id', deleteConnection);

export default connectionRouter;