import { Transaction } from "../entities/Transaction";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/database.connection";

export const getTransactionRepository = async (): Promise<
  Repository<Transaction>
> => {
  const transactionRepository: Repository<Transaction> =
    AppDataSource.manager.getRepository(Transaction);

  return transactionRepository;
};
