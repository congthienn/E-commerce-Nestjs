import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableProductOrder1639022831665 implements MigrationInterface {
    name = 'createTableProductOrder1639022831665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_to_order" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "productTypeId" integer NOT NULL, "orderId" character varying NOT NULL, CONSTRAINT "PK_c8cdf4a201263c15f99994bba71" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_to_order" ADD CONSTRAINT "FK_138ed80a26c2205c6c5f9b5aed0" FOREIGN KEY ("productTypeId") REFERENCES "product_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_to_order" ADD CONSTRAINT "FK_37a14f7472c66e24dd48688869a" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_to_order" DROP CONSTRAINT "FK_37a14f7472c66e24dd48688869a"`);
        await queryRunner.query(`ALTER TABLE "product_to_order" DROP CONSTRAINT "FK_138ed80a26c2205c6c5f9b5aed0"`);
        await queryRunner.query(`DROP TABLE "product_to_order"`);
    }

}
