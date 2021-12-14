import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsTableProduct1638781286604 implements MigrationInterface {
    name = 'addColumnsTableProduct1638781286604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "cameraId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "designId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "pinId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "designScreenId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "specialFeatureId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d03bb3dfbff558e65b6d5ab4450" FOREIGN KEY ("cameraId") REFERENCES "camera"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_2669d8449eed7fbf21d8f2bee09" FOREIGN KEY ("designId") REFERENCES "design"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_8bc3d793b14679700b237ffef64" FOREIGN KEY ("pinId") REFERENCES "pin"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_cb2b9f65f50ee3a8446cf395e4e" FOREIGN KEY ("designScreenId") REFERENCES "design_screen"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_7ac965692c76cdf26d7068c82c0" FOREIGN KEY ("specialFeatureId") REFERENCES "special_feature"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_7ac965692c76cdf26d7068c82c0"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_cb2b9f65f50ee3a8446cf395e4e"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_8bc3d793b14679700b237ffef64"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_2669d8449eed7fbf21d8f2bee09"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_d03bb3dfbff558e65b6d5ab4450"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "specialFeatureId"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "designScreenId"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "pinId"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "designId"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "cameraId"`);
    }

}
