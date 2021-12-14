import {MigrationInterface, QueryRunner} from "typeorm";

export class editColumnScreenTechnology1639120704420 implements MigrationInterface {
    name = 'editColumnScreenTechnology1639120704420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_screen_info" DROP COLUMN "screen_technology"`);
        await queryRunner.query(`ALTER TABLE "product_screen_info" ADD "screen_technology" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_screen_info" DROP COLUMN "screen_technology"`);
        await queryRunner.query(`ALTER TABLE "product_screen_info" ADD "screen_technology" character varying(10) NOT NULL`);
    }

}
