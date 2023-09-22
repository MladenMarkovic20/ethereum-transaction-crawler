import express, { Router } from "express";
import {
  getTransactionsResults,
  updateDatabaseWithNewData,
  removeAllRecordFromDB,
} from "../controllers/TransactionController";

const router: Router = express.Router();

router.get("/transactions", getTransactionsResults);

router.post("/update-database", (req, res) => {
  const { walletAddress, page } = req.body;

  if (!walletAddress) {
    return res.status(400).json({
      error: "Wallet address can't be empty. Please enter some wallet address.",
    });
  }

  if (walletAddress) {
    const ethAddressPattern = /^(0x)?[0-9a-fA-F]{40}$/;
    if (ethAddressPattern.test(walletAddress)) {
      updateDatabaseWithNewData(req, res);
      console.log("Valid Ethereum address");
    } else {
      return res.status(400).json({
        error: "Invalid Ethereum address",
      });
    }
  }
});

router.delete("/", removeAllRecordFromDB);

export default router;
