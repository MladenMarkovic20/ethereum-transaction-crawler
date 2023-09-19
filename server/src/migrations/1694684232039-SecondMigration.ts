import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1694684232039 implements MigrationInterface {
    name = 'SecondMigration1694684232039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "input"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "contractAddress"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "isError"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "cumulativeGasUsed"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "gasUsed"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "methodId"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "functionName"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "gas"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "gas" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "gas"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "gas" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "functionName" character varying`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "methodId" character varying`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "gasUsed" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "cumulativeGasUsed" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "isError" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "contractAddress" character varying`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "input" character varying`);
    }

}
