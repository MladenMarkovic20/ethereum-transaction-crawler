import dotenv from "dotenv";
dotenv.config();

export const getURLofTransactionsByAddress = (
  address: string,
  page: number
): string => {
  return `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=9000000&endblock='latest'&page=${page}
  &offset=25&sort=desc&apikey=${process.env.API_KEY}`;
};
