import {MigrationInterface, QueryRunner} from "typeorm";

export class alterColumnDeliveryTimeTableOrder1640703182336 implements MigrationInterface {
    name = 'alterColumnDeliveryTimeTableOrder1640703182336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "delivery_time" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "delivery_time" SET NOT NULL`);
    }

}
