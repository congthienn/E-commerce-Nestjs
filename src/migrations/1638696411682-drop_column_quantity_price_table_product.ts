import {MigrationInterface, QueryRunner} from "typeorm";

export class dropColumnQuantityPriceTableProduct1638696411682 implements MigrationInterface {
    name = 'dropColumnQuantityPriceTableProduct1638696411682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "product_qty"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "product_qty" integer NOT NULL`);
    }

}
