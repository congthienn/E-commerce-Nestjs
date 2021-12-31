import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableNotification1640765879258 implements MigrationInterface {
    name = 'createTableNotification1640765879258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notification" ("id" character varying NOT NULL, "title" text NOT NULL, "body" text NOT NULL, "time" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notification"`);
    }

}
