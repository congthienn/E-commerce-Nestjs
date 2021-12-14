import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablePin1638765741563 implements MigrationInterface {
    name = 'createTablePin1638765741563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pin" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_c885a9928998bae0e76c863c10a" UNIQUE ("name"), CONSTRAINT "PK_63a05514d6764193f9dde04bae0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pin"`);
    }

}
