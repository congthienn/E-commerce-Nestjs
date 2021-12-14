import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableProductPinInfo1639115533499 implements MigrationInterface {
    name = 'createTableProductPinInfo1639115533499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_pin_info" ("id" SERIAL NOT NULL, "capacity" character varying NOT NULL, "pin_type" character varying NOT NULL, "maximum_support" character varying NOT NULL, "pin_technology" character varying NOT NULL, "charging_port" character varying NOT NULL, "productId" integer NOT NULL, CONSTRAINT "REL_9d2fe5fa93667f141c8a18bd2a" UNIQUE ("productId"), CONSTRAINT "PK_cfae613e7cd3095cc168909f475" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_pin_info" ADD CONSTRAINT "FK_9d2fe5fa93667f141c8a18bd2ab" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_pin_info" DROP CONSTRAINT "FK_9d2fe5fa93667f141c8a18bd2ab"`);
        await queryRunner.query(`DROP TABLE "product_pin_info"`);
    }

}
