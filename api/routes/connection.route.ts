import express from "express";
import { createConnection, deleteConnection, readAllConnections } from '../controllers/connection.controller';


const connectionRouter = express()

connectionRouter.post('/', createConnection);

connectionRouter.get('/', readAllConnections);

connectionRouter.delete('/:_id', deleteConnection);

export default connectionRouter;