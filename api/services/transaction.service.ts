import { model } from "mongoose"
import { TransactionSchema } from "../schemas/transaction.schema"
import { createObjectCsvWriter } from "csv-writer";
import { TransactionInterface } from "../../interfaces/transaction.interface";

const Transaction = model('transaction', TransactionSchema);

export const getBankResult = async (limit: number = 1000): Promise<object> => {
    const belowLimit = await Transaction.aggregate([{$match: {
        amount: {$lte: 1000}
      }}, {$group: {
        _id: "result",
        bankResult: {
          $sum: {$multiply: ['$amount', 0.1]}
        }
      }}])

    const aboveLimit = await Transaction.aggregate([{$match: {
    amount: {$gt: 1000}
    }}, {$group: {
    _id: "result",
    bankResult: {
        $sum: {$multiply: ['$amount', 0.05]}
    }
    }}]);
    
    const below = !belowLimit.length ? 0 : belowLimit[0].bankResult;
    const above = !aboveLimit.length ? 0 : aboveLimit[0].bankResult;

    return {
        bankResult: below + above
    };
}

export const saveToCSV = async (): Promise<void> => {
    const transactions = await Transaction.find({})
        .populate(['sender', 'receiver', 'senderAccount', 'receiverAccount'])
        .sort({createdAt: 1})
        .exec() as unknown as TransactionInterface[];
    const header = [
        {id: 'sender', title: 'SENDER'},
        {id: 'receiver', title: 'RECEIVER'},
        {id: 'amount', title: 'AMOUNT'},
        {id: 'timestamp', title: 'TIMESTAMP'}      
    ];
    const records = transactions.map( _record => {
        return {
        sender: _record.senderAccount.number,
        receiver: _record.receiverAccount.number,
        amount: _record.amount,
        timestamp: _record.operationDate
        }
    });

    createObjectCsvWriter({
        path: './transactions.csv',
        header
    }).writeRecords(records);

    return;
}