import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableUser21640675780442 implements MigrationInterface {
    name = 'alterTableUser21640675780442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name")`);
    }

}
