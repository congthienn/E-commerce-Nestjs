import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableUser1640406966554 implements MigrationInterface {
    name = 'alterTableUser1640406966554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation_user" DROP CONSTRAINT "FK_39e655cc204c899bb0ffe6266c8"`);
        await queryRunner.query(`ALTER TABLE "conversation_user" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "conversation_user" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "socket_user" DROP CONSTRAINT "FK_e03659db7bcb7f0231a0d1c1341"`);
        await queryRunner.query(`ALTER TABLE "socket_user" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "socket_user" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ward" DROP CONSTRAINT "FK_e92f25c6eb22377d37a66ba97a8"`);
        await queryRunner.query(`ALTER TABLE "ward" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "ward" ADD "usersId" character varying`);
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_57a33cf804b6f48ef599e675e50"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "district" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "district" ADD "usersId" character varying`);
        await queryRunner.query(`ALTER TABLE "conversation_user" ADD CONSTRAINT "FK_39e655cc204c899bb0ffe6266c8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "socket_user" ADD CONSTRAINT "FK_e03659db7bcb7f0231a0d1c1341" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ward" ADD CONSTRAINT "FK_e92f25c6eb22377d37a66ba97a8" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_57a33cf804b6f48ef599e675e50" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_57a33cf804b6f48ef599e675e50"`);
        await queryRunner.query(`ALTER TABLE "ward" DROP CONSTRAINT "FK_e92f25c6eb22377d37a66ba97a8"`);
        await queryRunner.query(`ALTER TABLE "socket_user" DROP CONSTRAINT "FK_e03659db7bcb7f0231a0d1c1341"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
        await queryRunner.query(`ALTER TABLE "conversation_user" DROP CONSTRAINT "FK_39e655cc204c899bb0ffe6266c8"`);
        await queryRunner.query(`ALTER TABLE "district" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "district" ADD "usersId" integer`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_57a33cf804b6f48ef599e675e50" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ward" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "ward" ADD "usersId" integer`);
        await queryRunner.query(`ALTER TABLE "ward" ADD CONSTRAINT "FK_e92f25c6eb22377d37a66ba97a8" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "socket_user" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "socket_user" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "socket_user" ADD CONSTRAINT "FK_e03659db7bcb7f0231a0d1c1341" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_user" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "conversation_user" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "conversation_user" ADD CONSTRAINT "FK_39e655cc204c899bb0ffe6266c8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
