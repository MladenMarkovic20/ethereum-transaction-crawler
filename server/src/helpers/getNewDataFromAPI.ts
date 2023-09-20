import axios from "axios";
import { getURLofTransactionsByAddress } from "./getURLofTransactionsByAddress";
import { ITransactionData } from "../interface/ITransactionData";

export const getNewDataFromAPI = async (): Promise<ITransactionData[]> => {
  const walletAddress = "0x80191032fB4d309501d2EBc09a1A7d7F2941C8C1";

  const url = getURLofTransactionsByAddress(walletAddress);

  const response = await axios.get(url);

  return response.data.result;
};
