import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableDistrict1638607367623 implements MigrationInterface {
    name = 'createTableDistrict1638607367623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "district" ("id" character varying(6) NOT NULL, "name" character varying(255) NOT NULL, "type" character varying(255) NOT NULL, "provinceId" character varying NOT NULL, CONSTRAINT "PK_ee5cb6fd5223164bb87ea693f1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_23a21b38208367a242b1dd3a424" FOREIGN KEY ("provinceId") REFERENCES "province"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_23a21b38208367a242b1dd3a424"`);
        await queryRunner.query(`DROP TABLE "district"`);
    }

}
