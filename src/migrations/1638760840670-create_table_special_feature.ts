import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableSpecialFeature1638760840670 implements MigrationInterface {
    name = 'createTableSpecialFeature1638760840670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "special_feature" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_77a0dea6ca0e7c4f72115d7f8fc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "special_feature"`);
    }

}
