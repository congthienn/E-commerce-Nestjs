import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableFcmToken1640849215199 implements MigrationInterface {
    name = 'alterTableFcmToken1640849215199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fcm_token" DROP CONSTRAINT "FK_eda4e3fc14adda28b0c06e095cd"`);
        await queryRunner.query(`ALTER TABLE "fcm_token" ADD CONSTRAINT "UQ_eda4e3fc14adda28b0c06e095cd" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "fcm_token" ADD CONSTRAINT "FK_eda4e3fc14adda28b0c06e095cd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fcm_token" DROP CONSTRAINT "FK_eda4e3fc14adda28b0c06e095cd"`);
        await queryRunner.query(`ALTER TABLE "fcm_token" DROP CONSTRAINT "UQ_eda4e3fc14adda28b0c06e095cd"`);
        await queryRunner.query(`ALTER TABLE "fcm_token" ADD CONSTRAINT "FK_eda4e3fc14adda28b0c06e095cd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
