import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableProductRearCameraInfo1639109619500 implements MigrationInterface {
    name = 'createTableProductRearCameraInfo1639109619500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_rear_camera_info" ("id" SERIAL NOT NULL, "camera_resolution" character varying NOT NULL, "film" character varying NOT NULL, "flash_light" character varying NOT NULL, "feature" character varying NOT NULL, "productId" integer, CONSTRAINT "REL_c296c0f8808ec2a8056e04bb51" UNIQUE ("productId"), CONSTRAINT "PK_d6cf99fa10690722b7053e988e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_rear_camera_info" ADD CONSTRAINT "FK_c296c0f8808ec2a8056e04bb51e" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_rear_camera_info" DROP CONSTRAINT "FK_c296c0f8808ec2a8056e04bb51e"`);
        await queryRunner.query(`DROP TABLE "product_rear_camera_info"`);
    }

}
