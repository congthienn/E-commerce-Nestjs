import {MigrationInterface, QueryRunner} from "typeorm";

export class editTableUser1640406406919 implements MigrationInterface {
    name = 'editTableUser1640406406919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "ward" ADD "usersId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roleId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "provinceId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "districtId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "wardId" character varying`);
        await queryRunner.query(`ALTER TABLE "district" ADD "usersId" integer`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ward" ADD CONSTRAINT "FK_e92f25c6eb22377d37a66ba97a8" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e919016c871c3266b564dd696c1" FOREIGN KEY ("provinceId") REFERENCES "province"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9c0c22394fd0de777921112069c" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5ca267c961911128555d353737a" FOREIGN KEY ("wardId") REFERENCES "ward"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_57a33cf804b6f48ef599e675e50" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_57a33cf804b6f48ef599e675e50"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5ca267c961911128555d353737a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9c0c22394fd0de777921112069c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e919016c871c3266b564dd696c1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "ward" DROP CONSTRAINT "FK_e92f25c6eb22377d37a66ba97a8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "district" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "wardId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "districtId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provinceId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "ward" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying(255) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'editor', 'user')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'user'`);
    }

}
