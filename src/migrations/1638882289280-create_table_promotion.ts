import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablePromotion1638882289280 implements MigrationInterface {
    name = 'createTablePromotion1638882289280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "promotion" ("id" SERIAL NOT NULL, "promotion_form" text NOT NULL, "time" date, "productId" integer NOT NULL, CONSTRAINT "UQ_020de6e226135b9f35412cde123" UNIQUE ("promotion_form", "productId"), CONSTRAINT "PK_fab3630e0789a2002f1cadb7d38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "promotion" ADD CONSTRAINT "FK_9f2d4ec8a543fafdf3cf0cb2c35" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promotion" DROP CONSTRAINT "FK_9f2d4ec8a543fafdf3cf0cb2c35"`);
        await queryRunner.query(`DROP TABLE "promotion"`);
    }

}
