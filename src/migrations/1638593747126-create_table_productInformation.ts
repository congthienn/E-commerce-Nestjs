import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableProductInformation1638593747126 implements MigrationInterface {
    name = 'createTableProductInformation1638593747126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_information" ("id" SERIAL NOT NULL, "screen" character varying NOT NULL, "type" character varying NOT NULL, "operating_system" character varying(255) NOT NULL, "ram" character varying(10) NOT NULL, "rear_camera" character varying(255) NOT NULL, "front_camera" character varying(255) NOT NULL, "chip" character varying(255) NOT NULL, "sim" character varying(255) NOT NULL, "productId" integer NOT NULL, CONSTRAINT "UQ_ad02cbc0c5bcc89b92c503ce888" UNIQUE ("productId"), CONSTRAINT "REL_ad02cbc0c5bcc89b92c503ce88" UNIQUE ("productId"), CONSTRAINT "PK_b6c25d1842495d130ffd5170e80" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_information" ADD CONSTRAINT "FK_ad02cbc0c5bcc89b92c503ce888" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_information" DROP CONSTRAINT "FK_ad02cbc0c5bcc89b92c503ce888"`);
        await queryRunner.query(`DROP TABLE "product_information"`);
    }

}
