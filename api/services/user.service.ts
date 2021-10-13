import { model } from "mongoose";
import { UserInterface } from "../../interfaces/user.interface";
import { UserSchema } from "../schemas/user.schema";
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { secretOrKey } from "../../config/config";

const User = model('user', UserSchema);

export const createPassword = (length: number = 14): string => {
    let password: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$&ç';
    const charactersLength: number = characters.length;
    for ( let i = 0; i < length; i++ ) {
      password += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return password;
}

export const checkPassword = async (firstName: string, password: string): Promise<boolean> => {
   const user = await User.findOne({ firstName }) as unknown as UserInterface;

   return user.password === password;
}

export const findUserById = async (userId: string): Promise<UserInterface> => {
   const user = User.findById(userId) as unknown as UserInterface;

   if (!user) throw new Error('User not found');
   
   return user;
}

/**
 * Authentication middleware, to be implemented in the desired routes.
 * @param req express Request object
 * @param res express Response object
 * @param next express Next function
 * @returns a string with the error, or continues to the route
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response<string> | void => {
   const authHeader = req.headers['authorization'];
   if (!authHeader) return res.status(401).send('A token must be provided');

   const token = authHeader && authHeader.split(' ')[1];

   if (!token) return res.status(401).send('User unauthorized.')

   jwt.verify(token, secretOrKey as string, (err: any, user) => {
      if (err) return res.status(403).send(`Something went wrong while authenticating the provided token: \n ${err}`);
      req.body.user = user;
      next();
   })

   return;
}