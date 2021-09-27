import { model } from "mongoose";
import { AccountInterface } from "../../interfaces/account.interface";
import { AccountSchema } from "../schemas/account.schema";

const Account = model('account', AccountSchema);

export const accountNumberAssigner = (): number => {
    const numbers: number[] = [];

    while (numbers.length < 10) {
        const digit = Math.floor(Math.random() * 100) + 1;
        numbers.push(digit);
    }
    
    return parseInt(numbers.join(''));
}

export const findAccountDetails = async (accountId: string): Promise<AccountInterface>  => {
    try {
        const account = await Account.findOne({_id: accountId})
        .populate('owner');

        return account  as unknown as AccountInterface;
    } catch (err){
        throw err;
    }    
}

export const findAccountDetailsByNumber = async (number: number): Promise<AccountInterface> => {
    try {
        const account = await Account.findOne({ number })
        .populate('owner');

        return account  as unknown as AccountInterface;
    } catch (err){
        throw err;
    }
}

export const updateAccountsFunds = async (senderAccount: AccountInterface, receiverAccount: AccountInterface, amount: number): Promise<void> => {
    await Account.findOneAndUpdate({ number: senderAccount.number }, { funds: senderAccount.funds - amount});
    await Account.findOneAndUpdate({ number: receiverAccount.number }, { funds: receiverAccount.funds + amount});

    return;
}