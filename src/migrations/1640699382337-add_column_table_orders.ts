import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnTableOrders1640699382337 implements MigrationInterface {
    name = 'addColumnTableOrders1640699382337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "phone"`);
    }

}
