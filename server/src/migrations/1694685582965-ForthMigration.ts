import { MigrationInterface, QueryRunner } from "typeorm";

export class ForthMigration1694685582965 implements MigrationInterface {
    name = 'ForthMigration1694685582965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "hash" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "blockNumber" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "timeStamp" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "from" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "to" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "value" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "gas" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "gasPrice" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "gasPrice" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "gas" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "value" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "to" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "from" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "timeStamp" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "blockNumber" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "hash" DROP DEFAULT`);
    }

}
