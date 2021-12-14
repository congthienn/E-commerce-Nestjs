import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableSocketUser1639299299413 implements MigrationInterface {
    name = 'createTableSocketUser1639299299413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "socket_user" ("id" SERIAL NOT NULL, "socketId" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_51c645abf9b54943f7ede23191f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "socket_user" ADD CONSTRAINT "FK_e03659db7bcb7f0231a0d1c1341" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "socket_user" DROP CONSTRAINT "FK_e03659db7bcb7f0231a0d1c1341"`);
        await queryRunner.query(`DROP TABLE "socket_user"`);
    }

}
