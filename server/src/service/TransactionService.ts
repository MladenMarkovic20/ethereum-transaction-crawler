import { formatEther } from "ethers";
import { Transaction } from "../entities/Transaction";
import { AppDataSource } from "../config/database.connection";
import { getNewDataFromAPI } from "../helpers/getNewDataFromAPI";
import { getTransactionRepository } from "../repository/TransactionRepository";
import { EntityManager } from "typeorm";

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

    const transactionByHash = await transactionRepository.findOne({
      where: { hash },
    });

    return transactionByHash;
  }

  static async updateDatabaseWithNewData(
    walletAddress: string,
    page: number
  ): Promise<void> {
    try {
      await AppDataSource.manager.transaction(
        async (transactionalEntityManager: EntityManager) => {
          const newTransactionsFromAPI = await getNewDataFromAPI(
            walletAddress,
            page
          );

          for (const transaction of newTransactionsFromAPI) {
            const timestamp = new Date(Number(transaction.timeStamp) * 1000);
            const formattedTimestamp = timestamp
              .toISOString()
              .replace(/T/, " ")
              .replace(/\..+/, "");

            const savedTransaction = await TransactionService.findOneByHash(
              transaction.hash
            );

            if (!savedTransaction) {
              const newTransaction = new Transaction();
              newTransaction.hash = transaction.hash;
              newTransaction.method = !transaction.functionName
                ? "Transfer"
                : transaction.functionName;
              newTransaction.blockNumber = transaction.blockNumber;
              newTransaction.timeStamp = formattedTimestamp;
              newTransaction.from = transaction.from;
              newTransaction.to = transaction.to;
              newTransaction.value = `${formatEther(transaction.value)} ETH`;
              newTransaction.txnFee = formatEther(transaction.gasPrice);

              transactionalEntityManager
                .getRepository(Transaction)
                .save(newTransaction);
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async removeAllRecordFromDB(): Promise<void> {
    const transactionRepository = await getTransactionRepository();
    await transactionRepository.clear();
  }
}
