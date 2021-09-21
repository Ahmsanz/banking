import { User } from "./user.interface";

export interface AccountInterface {
    owner: User;
    number: number;
    funds: number;    
}