import express from "express";
import { createUser, deleteUser, login, readAllUsers, updateUser } from '../controllers/user.controller';


const userRouter = express()

userRouter.post('/', createUser);

userRouter.post('/login', login);

userRouter.get('/', readAllUsers);

userRouter.put('/:_id', updateUser);

userRouter.delete('/:_id', deleteUser);

export default userRouter;