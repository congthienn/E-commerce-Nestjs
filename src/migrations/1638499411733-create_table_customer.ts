import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableCustomer1638499411733 implements MigrationInterface {
    name = 'createTableCustomer1638499411733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" text, "phoneNumber" character varying NOT NULL, "email" character varying(255) NOT NULL, "address" text NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_2e64383bae8871598afb8b73f0d" UNIQUE ("phoneNumber"), CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
