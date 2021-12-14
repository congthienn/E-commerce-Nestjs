import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableWard1638607905581 implements MigrationInterface {
    name = 'createTableWard1638607905581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ward" ("id" character varying(6) NOT NULL, "name" character varying(255) NOT NULL, "type" character varying(255) NOT NULL, "districtId" character varying NOT NULL, CONSTRAINT "PK_e6725fa4a50e449c4352d2230e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ward" ADD CONSTRAINT "FK_19a3bc9b3be291e8b9bc2bb623b" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ward" DROP CONSTRAINT "FK_19a3bc9b3be291e8b9bc2bb623b"`);
        await queryRunner.query(`DROP TABLE "ward"`);
    }

}
