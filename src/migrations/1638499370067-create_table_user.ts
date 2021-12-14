import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableUser1638499370067 implements MigrationInterface {
    name = 'createTableUser1638499370067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "user_name" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "phone" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying(255) NOT NULL, "avatar" character varying, CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name"), CONSTRAINT "UQ_47b23b06e27ab078de4af18bc85" UNIQUE ("email", "phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
