import { AccountInterface } from "./account.interface";
import { UserInterface } from "./user.interface";

export enum StatusEnum {
    pending = 'pending',
    accepted = 'accepted',
    deleted = 'deleted'
}

export interface ConnectionInterface {
    owner: UserInterface;
    contact: UserInterface;
    status: StatusEnum;
    receiverAccount: AccountInterface;
    connectionDate: Date;

}