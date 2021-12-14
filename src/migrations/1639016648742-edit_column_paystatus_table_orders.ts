import {MigrationInterface, QueryRunner} from "typeorm";

export class editColumnPaystatusTableOrders1639016648742 implements MigrationInterface {
    name = 'editColumnPaystatusTableOrders1639016648742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "pay_status"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_pay_status_enum" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "pay_status" "public"."orders_pay_status_enum" NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "pay_status"`);
        await queryRunner.query(`DROP TYPE "public"."orders_pay_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "pay_status" bit NOT NULL`);
    }

}
