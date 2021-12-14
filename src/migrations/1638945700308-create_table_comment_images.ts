import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableCommentImages1638945700308 implements MigrationInterface {
    name = 'createTableCommentImages1638945700308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment_images" ("id" SERIAL NOT NULL, "img" text NOT NULL, "commentId" integer NOT NULL, CONSTRAINT "PK_3825085cf9ac268fc653e6e494a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment_images" ADD CONSTRAINT "FK_1be806df8712c0404cf983a611d" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_images" DROP CONSTRAINT "FK_1be806df8712c0404cf983a611d"`);
        await queryRunner.query(`DROP TABLE "comment_images"`);
    }

}
