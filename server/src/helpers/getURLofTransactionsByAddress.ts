import dotenv from "dotenv";
dotenv.config();

export const getURLofTransactionsByAddress = (address: string): string => {
  return `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=9000000&endblock='latest'&page=1
  &offset=25&sort=desc&apikey=${process.env.API_KEY}`;
};
