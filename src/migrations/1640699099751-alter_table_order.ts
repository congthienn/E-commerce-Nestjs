import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableOrder1640699099751 implements MigrationInterface {
    name = 'alterTableOrder1640699099751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customer"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "phone" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "customer" character varying(255) NOT NULL`);
    }

}
