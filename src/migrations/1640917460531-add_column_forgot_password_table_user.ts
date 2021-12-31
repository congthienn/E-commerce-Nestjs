import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnForgotPasswordTableUser1640917460531 implements MigrationInterface {
    name = 'addColumnForgotPasswordTableUser1640917460531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "forgot_password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "forgot_password"`);
    }

}
