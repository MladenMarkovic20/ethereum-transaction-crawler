// backend/src/controllers/TransactionController.ts
import { Request, Response } from "express";
import { TransactionService } from "../service/TransactionService";

export const getTransactionsResults = async (req: Request, res: Response) => {
  try {
    const results = await TransactionService.getAllTransactionByAddress();
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const updateDatabaseWithNewData = async () => {
  await TransactionService.updateDatabaseWithNewData();
};
