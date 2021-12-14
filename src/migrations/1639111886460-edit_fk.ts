import {MigrationInterface, QueryRunner} from "typeorm";

export class editFk1639111886460 implements MigrationInterface {
    name = 'editFk1639111886460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_screen_info" DROP CONSTRAINT "FK_518e42d577b30f75506f4e2d4e5"`);
        await queryRunner.query(`ALTER TABLE "product_screen_info" ALTER COLUMN "productId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_rear_camera_info" DROP CONSTRAINT "FK_c296c0f8808ec2a8056e04bb51e"`);
        await queryRunner.query(`ALTER TABLE "product_rear_camera_info" ALTER COLUMN "productId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_operating_system_info" DROP CONSTRAINT "FK_df1953c9a53ef373626cd8bbb53"`);
        await queryRunner.query(`ALTER TABLE "product_operating_system_info" ALTER COLUMN "productId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_screen_info" ADD CONSTRAINT "FK_518e42d577b30f75506f4e2d4e5" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_rear_camera_info" ADD CONSTRAINT "FK_c296c0f8808ec2a8056e04bb51e" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_operating_system_info" ADD CONSTRAINT "FK_df1953c9a53ef373626cd8bbb53" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_operating_system_info" DROP CONSTRAINT "FK_df1953c9a53ef373626cd8bbb53"`);
        await queryRunner.query(`ALTER TABLE "product_rear_camera_info" DROP CONSTRAINT "FK_c296c0f8808ec2a8056e04bb51e"`);
        await queryRunner.query(`ALTER TABLE "product_screen_info" DROP CONSTRAINT "FK_518e42d577b30f75506f4e2d4e5"`);
        await queryRunner.query(`ALTER TABLE "product_operating_system_info" ALTER COLUMN "productId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_operating_system_info" ADD CONSTRAINT "FK_df1953c9a53ef373626cd8bbb53" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_rear_camera_info" ALTER COLUMN "productId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_rear_camera_info" ADD CONSTRAINT "FK_c296c0f8808ec2a8056e04bb51e" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_screen_info" ALTER COLUMN "productId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_screen_info" ADD CONSTRAINT "FK_518e42d577b30f75506f4e2d4e5" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
