import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableDistrictWard1640407640095 implements MigrationInterface {
    name = 'alterTableDistrictWard1640407640095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ward" DROP CONSTRAINT "FK_e92f25c6eb22377d37a66ba97a8"`);
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_57a33cf804b6f48ef599e675e50"`);
        await queryRunner.query(`ALTER TABLE "ward" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "district" DROP COLUMN "usersId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "district" ADD "usersId" character varying`);
        await queryRunner.query(`ALTER TABLE "ward" ADD "usersId" character varying`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_57a33cf804b6f48ef599e675e50" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ward" ADD CONSTRAINT "FK_e92f25c6eb22377d37a66ba97a8" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
