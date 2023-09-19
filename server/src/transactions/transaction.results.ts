// import dotenv from "dotenv";
// dotenv.config();
// import { getURLofTransactionsByAddress } from "../helpers/getURLofTransactionsByAddress";
// import { formatEther } from "ethers";
// import { Transaction } from "../entities/Transaction";
// import { getTransactionRepository } from "../repository/TransactionRepository";
// import axios from "axios";

// export const getTransactionsResults = async () => {
//   try {
//     // Respone from EtherScan API
//     const walletAddress = "0x80191032fB4d309501d2EBc09a1A7d7F2941C8C1";
//     const url = getURLofTransactionsByAddress(walletAddress);
//     const response = await axios.get(url);

//     if (response.data.result.length > 0) {
//       const transactions = await response.data.result;
//       const repository = getTransactionRepository();
//       for (const transaction of transactions) {
//         const timestamp = new Date(transaction.timeStamp * 1000);
//         const formattedTimestamp = timestamp
//           .toISOString()
//           .replace(/T/, " ")
//           .replace(/\..+/, "");

//         const existingTransaction = transaction ?? {};

//         const savedTransaction = (await repository).findOne({
//           where: { hash: existingTransaction.hash },
//         });

//         if (await savedTransaction) {
//           existingTransaction.method = !transaction.method
//             ? "Transfer"
//             : transaction.method;
//           existingTransaction.blockNumber = transaction.blockNumber;
//           existingTransaction.timeStamp = formattedTimestamp;
//           existingTransaction.from = transaction.from;
//           existingTransaction.to = transaction.to;
//           existingTransaction.value = `${formatEther(transaction.value)} ETH`;
//           existingTransaction.txnFee = formatEther(transaction.gasPrice);

//           (await repository).save(existingTransaction);
//         } else {
//           const newTransaction = new Transaction();
//           newTransaction.hash = transaction.hash;
//           newTransaction.method = !transaction.method
//             ? "Transfer"
//             : transaction.method;
//           newTransaction.blockNumber = transaction.blockNumber;
//           newTransaction.timeStamp = formattedTimestamp;
//           newTransaction.from = transaction.from;
//           newTransaction.to = transaction.to;
//           newTransaction.value = `${formatEther(transaction.value)} ETH`;
//           newTransaction.txnFee = formatEther(transaction.gasPrice);

//           (await repository).save(newTransaction);
//         }
//       }
//       const results = (await repository).find();
//       return results;
//     } else {
//       throw new Error(
//         `Request failed with status code ${response.status}. Please check input parameters.`
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
