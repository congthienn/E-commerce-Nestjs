import {MigrationInterface, QueryRunner} from "typeorm";

export class editColumnPriceTableProduct1638756204574 implements MigrationInterface {
    name = 'editColumnPriceTableProduct1638756204574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_price" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_price" DROP DEFAULT`);
    }

}
