import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnPayStatusTableOrder1639032540993 implements MigrationInterface {
    name = 'addColumnPayStatusTableOrder1639032540993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orders_pay_status_enum" AS ENUM('1', '0')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "pay_status" "public"."orders_pay_status_enum" NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "pay_status"`);
        await queryRunner.query(`DROP TYPE "public"."orders_pay_status_enum"`);
    }

}
