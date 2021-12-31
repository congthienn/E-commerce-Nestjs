import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnStripeCustomerIdTableUser1640683126592 implements MigrationInterface {
    name = 'addColumnStripeCustomerIdTableUser1640683126592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "stripeCustomerId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "stripeCustomerId"`);
    }

}
