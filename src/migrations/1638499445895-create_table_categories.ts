import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableCategories1638499445895 implements MigrationInterface {
    name = 'createTableCategories1638499445895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "category_name" text NOT NULL, CONSTRAINT "UQ_872bff57db2b6fe48c0913d8daa" UNIQUE ("category_name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
