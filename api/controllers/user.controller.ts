import { UserInterface } from '../../interfaces/user.interface';
import { Request, Response } from 'express';
import { UserSchema } from '../schemas/user.schema';
import { model } from 'mongoose';
import { checkPassword, createPassword } from '../services/user.service';
import * as jwt from 'jsonwebtoken';
import { secretOrKey } from '../../config/config';

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
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
    }
}

export const login = async (req: Request, res: Response): Promise<Response<object | string>> => {
    try {
        const { firstName, password } = req.body;

        const user = await User.findOne({firstName}) as unknown as UserInterface;

        if (!user) return res.status(404).json({err: 'User not found', msg: `Sorry, we don't seem to recall that name.  Try again and double check the spelling!`})

        const check = await checkPassword(firstName, password);

        if (!check) return res.status(403).json('Access denied! \n The password you used does not match with ours :(')

        const token =  jwt.sign({...user, login: new Date().toISOString()}, secretOrKey as string, {
            expiresIn: '15 minutes'
        });

        if (!token) return res.status(500).json('Something went wrong, try again!');

        return res.status(201).json({msg: 'Login successful. Welcome! Please, use this token in all your subsequent requests', token});
    } catch (err) {
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
    }    
}

export const readAllUsers = async (req: Request, res: Response): Promise<Response<UserInterface[]>> => {    
    try {
        const { query } = req;
        const users = await User.find({query});
        
        return res.status(200).send(users);
    } catch (err) {
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
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
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response<string>> => {
    try {
        const { _id } = req.params;

        await User.findByIdAndRemove(_id);

        return res.status(204).json('User deleted');
    } catch (err) {
        console.log('something went wrong')
        console.log(err);
        return res.status(500).json({msg: 'Something went wrong', error: err});
    }    
}