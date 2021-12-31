import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableUser1640615839364 implements MigrationInterface {
    name = 'alterTableUser1640615839364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_login_enum" AS ENUM('facebook', 'google', 'user')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "login" "public"."user_login_enum" NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_47b23b06e27ab078de4af18bc85"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_47b23b06e27ab078de4af18bc85" UNIQUE ("email", "phone")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_47b23b06e27ab078de4af18bc85"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_47b23b06e27ab078de4af18bc85" UNIQUE ("phone", "email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "login"`);
        await queryRunner.query(`DROP TYPE "public"."user_login_enum"`);
    }

}
