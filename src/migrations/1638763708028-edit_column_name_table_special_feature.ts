import {MigrationInterface, QueryRunner} from "typeorm";

export class editColumnNameTableSpecialFeature1638763708028 implements MigrationInterface {
    name = 'editColumnNameTableSpecialFeature1638763708028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "special_feature" ADD CONSTRAINT "UQ_562b04022d47c34258080871573" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "special_feature" DROP CONSTRAINT "UQ_562b04022d47c34258080871573"`);
    }

}
