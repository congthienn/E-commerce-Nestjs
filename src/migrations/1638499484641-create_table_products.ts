import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableProducts1638499484641 implements MigrationInterface {
    name = 'createTableProducts1638499484641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "product_name" text NOT NULL, "product_price" integer NOT NULL, "product_qty" integer NOT NULL, "product_review" text, "product_img" text, "categoryId" integer NOT NULL, CONSTRAINT "UQ_894a8151f2433fca9b81acb2975" UNIQUE ("product_name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
