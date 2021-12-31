import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnOrderOnlineTableOrders1640706264319 implements MigrationInterface {
    name = 'addColumnOrderOnlineTableOrders1640706264319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "orderOnline" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderOnline"`);
    }

}
