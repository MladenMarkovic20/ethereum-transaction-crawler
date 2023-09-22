import { dataSlice } from "ethers";
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

export const updateDatabaseWithNewData = async (
  req: Request,
  res: Response
) => {
  try {
    await TransactionService.updateDatabaseWithNewData(
      req.body.walletAddress,
      req.body.page
    );
    return res.status(201).json({
      message: "Database successfully updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

export const removeAllRecordFromDB = async (req: Request, res: Response) => {
  try {
    await TransactionService.removeAllRecordFromDB();
    const responseJson = {
      message: "All data has been successfully removed from the database.",
    };
    return res.status(204).json(responseJson);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};
