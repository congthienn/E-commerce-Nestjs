import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableConversationUser1639213246065 implements MigrationInterface {
    name = 'createTableConversationUser1639213246065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "conversation_user" ("id" SERIAL NOT NULL, "title" text NOT NULL, "userId" integer NOT NULL, "conversationId" character varying NOT NULL, CONSTRAINT "PK_0825886afb03b1a6f11345b4e8c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "conversation_user" ADD CONSTRAINT "FK_39e655cc204c899bb0ffe6266c8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_user" ADD CONSTRAINT "FK_f71233a63761553475a2acd8690" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_user" DROP CONSTRAINT "FK_f71233a63761553475a2acd8690"`);
        await queryRunner.query(`ALTER TABLE "conversation_user" DROP CONSTRAINT "FK_39e655cc204c899bb0ffe6266c8"`);
        await queryRunner.query(`DROP TABLE "conversation_user"`);
    }
}
