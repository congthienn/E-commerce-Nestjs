import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableFcmToken1640764152790 implements MigrationInterface {
    name = 'createTableFcmToken1640764152790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fcm_token" ("id" SERIAL NOT NULL, "FCM_registration_token" text NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "UQ_2b04b7989dcf22fddee54b5b458" UNIQUE ("FCM_registration_token"), CONSTRAINT "PK_ec8f7ff07f44545126442edd9e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fcm_token" ADD CONSTRAINT "FK_eda4e3fc14adda28b0c06e095cd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fcm_token" DROP CONSTRAINT "FK_eda4e3fc14adda28b0c06e095cd"`);
        await queryRunner.query(`DROP TABLE "fcm_token"`);
    }

}
