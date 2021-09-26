import { UserInterface } from "./user.interface";

export interface AccountInterface {
    owner: UserInterface;
    number: number;
    funds: number;    
}