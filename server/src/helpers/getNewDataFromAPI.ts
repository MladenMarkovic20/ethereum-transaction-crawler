import axios from "axios";
import { getURLofTransactionsByAddress } from "./getURLofTransactionsByAddress";
import { ITransactionData } from "../interface/ITransactionData";

export const getNewDataFromAPI = async (
  walletAddress: string,
  page: number
): Promise<ITransactionData[]> => {
  const url = getURLofTransactionsByAddress(walletAddress, page);
  const response = await axios.get(url);
  return response.data.result;
};
