import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionTable1695118719369 implements MigrationInterface {
    name = 'TransactionTable1695118719369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("hash" character varying NOT NULL DEFAULT '', "method" character varying DEFAULT '', "blockNumber" integer DEFAULT '0', "timeStamp" character varying DEFAULT '0', "from" character varying DEFAULT '', "to" character varying DEFAULT '', "value" character varying DEFAULT '', "txnFee" character varying DEFAULT '', CONSTRAINT "PK_de4f0899c41c688529784bc443f" PRIMARY KEY ("hash"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
