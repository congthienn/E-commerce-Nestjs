import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableProductOperatingSystemInfo1639110028695 implements MigrationInterface {
    name = 'createTableProductOperatingSystemInfo1639110028695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_operating_system_info" ("id" SERIAL NOT NULL, "operatingSystem" character varying NOT NULL, "CPU" character varying NOT NULL, "CPU_speed" character varying NOT NULL, "GPU" character varying NOT NULL, "productId" integer, CONSTRAINT "REL_df1953c9a53ef373626cd8bbb5" UNIQUE ("productId"), CONSTRAINT "PK_57f5745402fe4666314eb3b3704" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_operating_system_info" ADD CONSTRAINT "FK_df1953c9a53ef373626cd8bbb53" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_operating_system_info" DROP CONSTRAINT "FK_df1953c9a53ef373626cd8bbb53"`);
        await queryRunner.query(`DROP TABLE "product_operating_system_info"`);
    }

}
