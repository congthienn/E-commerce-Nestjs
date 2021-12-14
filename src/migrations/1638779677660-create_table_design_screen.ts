import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableDesignScreen1638779677660 implements MigrationInterface {
    name = 'createTableDesignScreen1638779677660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "design_screen" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_b749267ffc2188971f4de101c49" UNIQUE ("name"), CONSTRAINT "PK_d4316fceaf7f3b896b511e11718" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "design_screen"`);
    }

}
