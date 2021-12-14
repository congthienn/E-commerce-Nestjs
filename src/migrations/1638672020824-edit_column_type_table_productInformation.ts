import {MigrationInterface, QueryRunner} from "typeorm";

export class editColumnTypeTableProductInformation1638672020824 implements MigrationInterface {
    name = 'editColumnTypeTableProductInformation1638672020824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_information" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."product_information_type_enum" AS ENUM('android', 'iOS')`);
        await queryRunner.query(`ALTER TABLE "product_information" ADD "type" "public"."product_information_type_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_information" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."product_information_type_enum"`);
        await queryRunner.query(`ALTER TABLE "product_information" ADD "type" character varying NOT NULL`);
    }

}
