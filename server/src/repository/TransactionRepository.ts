import AppDataSource from "../config/database.connection";
import { Transaction } from "../entities/Transaction";
import { Repository } from "typeorm";

export const getTransactionRepository = async (): Promise<
  Repository<Transaction>
> => {
  const transactionRepository: Repository<Transaction> =
    AppDataSource.manager.getRepository(Transaction);
  return transactionRepository;
};
