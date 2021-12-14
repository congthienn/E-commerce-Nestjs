import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablePayments1638965024743 implements MigrationInterface {
    name = 'createTablePayments1638965024743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "formality" text NOT NULL, CONSTRAINT "UQ_1b16f3a87fd7fa3fa8e1edeeeb6" UNIQUE ("formality"), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payments"`);
    }

}
