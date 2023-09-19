import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryColumn({ default: "" })
  hash: string;

  @Column({ default: "", nullable: true })
  method: string;

  @Column({ default: 0, nullable: true })
  blockNumber: number;

  @Column({ default: 0, nullable: true })
  timeStamp: string;

  @Column({ default: "", nullable: true })
  from: string;

  @Column({ default: "", nullable: true })
  to: string;

  @Column({ default: "", nullable: true })
  value: string;

  @Column({ default: "", nullable: true })
  txnFee: string;
}
