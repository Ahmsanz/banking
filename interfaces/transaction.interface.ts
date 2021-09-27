import { AccountInterface } from "./account.interface";
import { UserInterface } from "./user.interface";

export interface TransactionInterface {
    sender: UserInterface;
    receiver: UserInterface;
    senderAccount: AccountInterface;
    receiverAccount: AccountInterface;
    amount: number;
    operationDate: Date;
}