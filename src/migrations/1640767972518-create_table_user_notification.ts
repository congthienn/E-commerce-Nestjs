import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableUserNotification1640767972518 implements MigrationInterface {
    name = 'createTableUserNotification1640767972518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_notification" ("id" SERIAL NOT NULL, "seend" boolean NOT NULL DEFAULT false, "userId" character varying NOT NULL, "notificationId" character varying NOT NULL, CONSTRAINT "PK_8840aac86dec5f669c541ce67d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_notification" ADD CONSTRAINT "FK_dce2a8927967051c447ae10bc8b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_notification" ADD CONSTRAINT "FK_680af16b67e94e2cb693b9e9033" FOREIGN KEY ("notificationId") REFERENCES "notification"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_notification" DROP CONSTRAINT "FK_680af16b67e94e2cb693b9e9033"`);
        await queryRunner.query(`ALTER TABLE "user_notification" DROP CONSTRAINT "FK_dce2a8927967051c447ae10bc8b"`);
        await queryRunner.query(`DROP TABLE "user_notification"`);
    }

}
