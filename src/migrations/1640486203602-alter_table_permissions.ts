import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTablePermissions1640486203602 implements MigrationInterface {
    name = 'alterTablePermissions1640486203602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ADD "permission" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "UQ_48ce552495d14eae9b187bb6716"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "UQ_e77c25aaad297ba331155532fa9" UNIQUE ("name", "permission")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "UQ_e77c25aaad297ba331155532fa9"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "permission"`);
    }

}
