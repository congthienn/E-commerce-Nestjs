import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableFcmToken11640849397286 implements MigrationInterface {
    name = 'alterTableFcmToken11640849397286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fcm_token" DROP CONSTRAINT "FK_eda4e3fc14adda28b0c06e095cd"`);
        await queryRunner.query(`ALTER TABLE "fcm_token" DROP CONSTRAINT "UQ_2b04b7989dcf22fddee54b5b458"`);
        await queryRunner.query(`ALTER TABLE "fcm_token" DROP CONSTRAINT "UQ_eda4e3fc14adda28b0c06e095cd"`);
        await queryRunner.query(`ALTER TABLE "fcm_token" ADD CONSTRAINT "UQ_2cae3e60fd5b045d252787a15af" UNIQUE ("FCM_registration_token", "userId")`);
        await queryRunner.query(`ALTER TABLE "fcm_token" ADD CONSTRAINT "FK_eda4e3fc14adda28b0c06e095cd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fcm_token" DROP CONSTRAINT "FK_eda4e3fc14adda28b0c06e095cd"`);
        await queryRunner.query(`ALTER TABLE "fcm_token" DROP CONSTRAINT "UQ_2cae3e60fd5b045d252787a15af"`);
        await queryRunner.query(`ALTER TABLE "fcm_token" ADD CONSTRAINT "UQ_eda4e3fc14adda28b0c06e095cd" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "fcm_token" ADD CONSTRAINT "UQ_2b04b7989dcf22fddee54b5b458" UNIQUE ("FCM_registration_token")`);
        await queryRunner.query(`ALTER TABLE "fcm_token" ADD CONSTRAINT "FK_eda4e3fc14adda28b0c06e095cd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
