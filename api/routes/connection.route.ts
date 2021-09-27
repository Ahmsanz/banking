import express from "express";
import { createConnection, deleteConnection, listContacts, readAllConnections } from '../controllers/connection.controller';


const connectionRouter = express()

connectionRouter.post('/', createConnection);

connectionRouter.get('/', readAllConnections);

connectionRouter.get('/list', listContacts);

connectionRouter.delete('/:_id', deleteConnection);

export default connectionRouter;