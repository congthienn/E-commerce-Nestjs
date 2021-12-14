import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableProductType1638677329558 implements MigrationInterface {
    name = 'createTableProductType1638677329558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_type_memory_enum" AS ENUM('32GB', '64GB', '128GB', '256GB', '512GB')`);
        await queryRunner.query(`CREATE TABLE "product_type" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "memory" "public"."product_type_memory_enum" NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "sold" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_1958edb363acd21da8056ab4537" UNIQUE ("productId", "memory"), CONSTRAINT "PK_e0843930fbb8854fe36ca39dae1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_type" ADD CONSTRAINT "FK_394240e06e0cbe2eb71f577d06f" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_type" DROP CONSTRAINT "FK_394240e06e0cbe2eb71f577d06f"`);
        await queryRunner.query(`DROP TABLE "product_type"`);
        await queryRunner.query(`DROP TYPE "public"."product_type_memory_enum"`);
    }

}
