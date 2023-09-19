import { MigrationInterface, QueryRunner } from "typeorm";

export class ThirdMigration1694684951683 implements MigrationInterface {
    name = 'ThirdMigration1694684951683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "value" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "gasPrice"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "gasPrice" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "gasPrice"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "gasPrice" numeric(36,18) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "value" numeric(36,18) NOT NULL`);
    }

}
