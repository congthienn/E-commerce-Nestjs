import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableComments1640577084068 implements MigrationInterface {
    name = 'alterTableComments1640577084068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "user_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "user_name" character varying(255) NOT NULL`);
    }

}
