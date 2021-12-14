import {MigrationInterface, QueryRunner} from "typeorm";

export class editTableOrder1639032235915 implements MigrationInterface {
    name = 'editTableOrder1639032235915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "pay_status" TO "order_status"`);
        await queryRunner.query(`ALTER TYPE "public"."orders_pay_status_enum" RENAME TO "orders_order_status_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."orders_order_status_enum" RENAME TO "orders_pay_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "order_status" TO "pay_status"`);
    }

}
