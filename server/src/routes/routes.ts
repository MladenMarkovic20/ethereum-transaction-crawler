import express, { Router } from "express";
import {
  getTransactionsResults,
  updateDatabaseWithNewData,
} from "../controllers/TransactionController";

const router: Router = express.Router();

router.get("/", getTransactionsResults);

router.get("/newTransaction", updateDatabaseWithNewData);

export default router;
