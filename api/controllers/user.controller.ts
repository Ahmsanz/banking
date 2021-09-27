import { UserInterface } from '../../interfaces/user.interface';
import { Request, Response } from 'express';
import { UserSchema } from '../schemas/user.schema';
import { model } from 'mongoose';
import { createPassword } from '../services/user.service';

const User = model('user', UserSchema);

export const createUser = async (req: Request, res: Response): Promise<Response<UserInterface>> => {
    try {
        const { firstName, lastName, age }: UserInterface = req.body;
        const newUser = new User({
            firstName,
            lastName,
            password: createPassword(),
            age
        });

        const userSaved = await User.create(newUser);

        return res.status(201).send(userSaved);
    } catch (err) {
        throw err;
    }
}

export const readAllUsers = async (req: Request, res: Response): Promise<Response<UserInterface[]>> => {    
    try {
        const { query } = req;
        const users = await User.find({query});
        
        return res.status(200).send(users);
    } catch (err) {
        throw err;
    }    
}

export const updateUser = async (req: Request, res: Response): Promise<Response<UserInterface>> => {
    try {
        const { _id } = req.params;
        const existingUser = User.findById(_id);
        if (!existingUser) return res.status(404).send('The specified user does not exist. Try a different user.');

        const { firstName, lastName } = req.body;

        const updatedUser = await User.findByIdAndUpdate(_id, { firstName, lastName }).then( updatedUser => updatedUser);
        
        return res.status(204).send(updatedUser);
    } catch (err) {
        throw err;
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response<string>> => {
    try {
        const { _id } = req.params;

        await User.findByIdAndRemove(_id);

        return res.status(204).send('User deleted');
    } catch (err) {
        throw err;
    }    
}