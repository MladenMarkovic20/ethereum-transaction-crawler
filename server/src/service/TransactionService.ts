import { formatEther } from "ethers";
import { Transaction } from "../entities/Transaction";
import { getNewDataFromAPI } from "../helpers/getNewDataFromAPI";
import { getTransactionRepository } from "../repository/TransactionRepository";

export class TransactionService {
  static async getAllTransactionByAddress(): Promise<
    Transaction[] | undefined
  > {
    try {
      const transactionRepository = await getTransactionRepository();

      const transactions = await transactionRepository
        .createQueryBuilder("transaction")
        .getMany();

      if (transactions.length === 0)
        throw new Error(
          "There is no records for transaction in current address!"
        );

      return transactions;
    } catch (error) {
      console.log(error);
    }
  }

  static async findOneByHash(hash: string): Promise<Transaction | null> {
    const transactionRepository = await getTransactionRepository();

    const transactionByHash = transactionRepository.findOne({
      where: { hash },
    });

    return transactionByHash;
  }

  static async updateDatabaseWithNewData(): Promise<void> {
    const transactionRepository = await getTransactionRepository();
    const newTransactionsFromAPI = await getNewDataFromAPI();

    for (const transaction of newTransactionsFromAPI) {
      const timestamp = new Date(Number(transaction.timeStamp) * 1000);
      const formattedTimestamp = timestamp
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");

      const existingTransaction = transaction ?? {};

      const savedTransaction = TransactionService.findOneByHash(
        transaction.hash
      );

      if (await savedTransaction) {
        existingTransaction.method = !transaction.method
          ? "Transfer"
          : transaction.method;
        existingTransaction.blockNumber = transaction.blockNumber;
        existingTransaction.timeStamp = formattedTimestamp;
        existingTransaction.from = transaction.from;
        existingTransaction.to = transaction.to;
        existingTransaction.value = `${formatEther(transaction.value)} ETH`;
        existingTransaction.txnFee = formatEther(transaction.gasPrice);

        transactionRepository.save(existingTransaction);
      } else {
        const newTransaction = new Transaction();
        newTransaction.hash = transaction.hash;
        newTransaction.method = !transaction.method
          ? "Transfer"
          : transaction.method;
        newTransaction.blockNumber = transaction.blockNumber;
        newTransaction.timeStamp = formattedTimestamp;
        newTransaction.from = transaction.from;
        newTransaction.to = transaction.to;
        newTransaction.value = `${formatEther(transaction.value)} ETH`;
        newTransaction.txnFee = formatEther(transaction.gasPrice);

        transactionRepository.save(newTransaction);
      }
    }
  }
}
