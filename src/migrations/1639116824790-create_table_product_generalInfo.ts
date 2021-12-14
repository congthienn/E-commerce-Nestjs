import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableProductGeneralInfo1639116824790 implements MigrationInterface {
    name = 'createTableProductGeneralInfo1639116824790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_pin_info" DROP CONSTRAINT "FK_9d2fe5fa93667f141c8a18bd2ab"`);
        await queryRunner.query(`CREATE TABLE "product_general_info" ("id" SERIAL NOT NULL, "productDesign" character varying NOT NULL, "material" character varying NOT NULL, "volume_size" character varying NOT NULL, "debut_time" date NOT NULL, "productId" integer NOT NULL, CONSTRAINT "REL_e403747ce486e0fd954e350da3" UNIQUE ("productId"), CONSTRAINT "PK_2a849a4f606e7cb1e191fae8649" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_pin_info" ADD CONSTRAINT "FK_9d2fe5fa93667f141c8a18bd2ab" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_general_info" ADD CONSTRAINT "FK_e403747ce486e0fd954e350da37" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_general_info" DROP CONSTRAINT "FK_e403747ce486e0fd954e350da37"`);
        await queryRunner.query(`ALTER TABLE "product_pin_info" DROP CONSTRAINT "FK_9d2fe5fa93667f141c8a18bd2ab"`);
        await queryRunner.query(`DROP TABLE "product_general_info"`);
        await queryRunner.query(`ALTER TABLE "product_pin_info" ADD CONSTRAINT "FK_9d2fe5fa93667f141c8a18bd2ab" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
