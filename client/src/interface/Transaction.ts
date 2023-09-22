export interface Transaction {
  blockNumber: number;
  from: string;
  hash: string;
  method: string;
  timeStamp: Date;
  to: string;
  txnFee: string;
  value: string;
}
