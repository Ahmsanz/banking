import { model } from "mongoose";
import { UserInterface } from "../../interfaces/user.interface";
import { UserSchema } from "../schemas/user.schema";
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const User = model('user', UserSchema);

export const createPassword = (length: number = 14): string => {
    let password: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$&ç';
    const charactersLength: number = characters.length;
    for ( let i = 0; i < length + 1; i++ ) {
      password += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return password;
}

export const checkPassword = async (firstName: string, password: string): Promise<boolean> => {
   const user = await User.findOne({ firstName }) as unknown as UserInterface;

   return user.password === password;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response<string> | void => {
   const authHeader = req.headers['authorization'];
   if (!authHeader) return res.status(401).send('A token must be provided');

   const token = authHeader && authHeader.split(' ')[1];

   if (!token) return res.status(401).send('User unauthorized.')

   jwt.verify(token, 'secret' as string, (err: any) => {
      if (err) return res.status(403).send('Something went wrong while authenticating the provided token');      
   })

   return next();
}