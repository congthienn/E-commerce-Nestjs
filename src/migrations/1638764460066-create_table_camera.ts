import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableCamera1638764460066 implements MigrationInterface {
    name = 'createTableCamera1638764460066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "camera" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_ff475de4c1f850e41b2799e6c1e" UNIQUE ("name"), CONSTRAINT "PK_3e6992bc5e67b9f9a6f95a5fe6f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "camera"`);
    }

}
