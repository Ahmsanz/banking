import express from "express";
import { createUser, deleteUser, readAllUsers, updateUser } from '../controllers/user.controller';


const userRouter = express()

userRouter.post('/', createUser);

userRouter.get('/', readAllUsers);

userRouter.put('/:_id', updateUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;