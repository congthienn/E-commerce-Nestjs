import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableOrders1638968394035 implements MigrationInterface {
    name = 'createTableOrders1638968394035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" character varying(10) NOT NULL, "price" integer NOT NULL, "customer" character varying(255) NOT NULL, "phone" character varying(255) NOT NULL, "email" character varying NOT NULL, "time_create" TIMESTAMP NOT NULL DEFAULT now(), "delivery_time" date NOT NULL, "paymentId" integer NOT NULL, "pay_status" bit NOT NULL, "adress" text NOT NULL, "provinceId" character varying NOT NULL, "districtId" character varying NOT NULL, "wardId" character varying NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_06a051324c76276ca2a9d1feb08" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_6bdcdf846a0fb286a76bcf0e126" FOREIGN KEY ("provinceId") REFERENCES "province"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_3ca5d3df6c89e9e49ddb01e3b91" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_60928e5a597bc2b88d0b0943f95" FOREIGN KEY ("wardId") REFERENCES "ward"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_60928e5a597bc2b88d0b0943f95"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_3ca5d3df6c89e9e49ddb01e3b91"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_6bdcdf846a0fb286a76bcf0e126"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_06a051324c76276ca2a9d1feb08"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
