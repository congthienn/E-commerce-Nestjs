import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableDesign1638763618480 implements MigrationInterface {
    name = 'createTableDesign1638763618480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "design" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8de36eda98dd058865fa31bf6d9" UNIQUE ("name"), CONSTRAINT "PK_e7a44f12414f03b7f38ff26dc8c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "design"`);
    }

}
