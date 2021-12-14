import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableProductScreenInfo1639103170672 implements MigrationInterface {
    name = 'createTableProductScreenInfo1639103170672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_screen_info" ("id" SERIAL NOT NULL, "screen_technology" character varying(10) NOT NULL, "resolution" character varying(255) NOT NULL, "widescreen" character varying(255) NOT NULL, "maximum_light" character varying(255) NOT NULL, "touch_screen" character varying(255) NOT NULL, "productId" integer, CONSTRAINT "REL_518e42d577b30f75506f4e2d4e" UNIQUE ("productId"), CONSTRAINT "PK_621645beb402ee63506e88261f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_screen_info" ADD CONSTRAINT "FK_518e42d577b30f75506f4e2d4e5" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_screen_info" DROP CONSTRAINT "FK_518e42d577b30f75506f4e2d4e5"`);
        await queryRunner.query(`DROP TABLE "product_screen_info"`);
    }

}
