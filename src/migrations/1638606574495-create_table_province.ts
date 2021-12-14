import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableProvince1638606574495 implements MigrationInterface {
    name = 'createTableProvince1638606574495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "province" ("id" character varying(6) NOT NULL, "name" character varying(255) NOT NULL, "type" character varying(255) NOT NULL, CONSTRAINT "PK_4f461cb46f57e806516b7073659" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "province"`);
    }

}
