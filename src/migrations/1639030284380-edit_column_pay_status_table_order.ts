import {MigrationInterface, QueryRunner} from "typeorm";

export class editColumnPayStatusTableOrder1639030284380 implements MigrationInterface {
    name = 'editColumnPayStatusTableOrder1639030284380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."orders_pay_status_enum" RENAME TO "orders_pay_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_pay_status_enum" AS ENUM('-1', '0', '1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "pay_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "pay_status" TYPE "public"."orders_pay_status_enum" USING "pay_status"::"text"::"public"."orders_pay_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "pay_status" SET DEFAULT '1'`);
        await queryRunner.query(`DROP TYPE "public"."orders_pay_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orders_pay_status_enum_old" AS ENUM('0', '1', '2', '3', '4', '5')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "pay_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "pay_status" TYPE "public"."orders_pay_status_enum_old" USING "pay_status"::"text"::"public"."orders_pay_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "pay_status" SET DEFAULT '1'`);
        await queryRunner.query(`DROP TYPE "public"."orders_pay_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."orders_pay_status_enum_old" RENAME TO "orders_pay_status_enum"`);
    }

}
