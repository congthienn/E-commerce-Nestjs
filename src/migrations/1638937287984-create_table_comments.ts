import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableComments1638937287984 implements MigrationInterface {
    name = 'createTableComments1638937287984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "customer" character varying(255) NOT NULL, "phone" character varying(12) NOT NULL, "email" character varying NOT NULL, "comment" text NOT NULL, "star" integer, "productId" integer NOT NULL, "replyCommentId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments_closure" ("id_ancestor" integer NOT NULL, "id_descendant" integer NOT NULL, CONSTRAINT "PK_a02e5093a5d47a64f1fd473d1ef" PRIMARY KEY ("id_ancestor", "id_descendant"))`);
        await queryRunner.query(`CREATE INDEX "IDX_89a2762362d968c2939b6fab19" ON "comments_closure" ("id_ancestor") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2164211fd6ab117cfb2ab8ba9" ON "comments_closure" ("id_descendant") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_fdc34567ec699eac3b19addddcc" FOREIGN KEY ("replyCommentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_closure" ADD CONSTRAINT "FK_89a2762362d968c2939b6fab193" FOREIGN KEY ("id_ancestor") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_closure" ADD CONSTRAINT "FK_d2164211fd6ab117cfb2ab8ba96" FOREIGN KEY ("id_descendant") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_closure" DROP CONSTRAINT "FK_d2164211fd6ab117cfb2ab8ba96"`);
        await queryRunner.query(`ALTER TABLE "comments_closure" DROP CONSTRAINT "FK_89a2762362d968c2939b6fab193"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9f8304787dd13d61bc94afd07b0"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_fdc34567ec699eac3b19addddcc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d2164211fd6ab117cfb2ab8ba9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_89a2762362d968c2939b6fab19"`);
        await queryRunner.query(`DROP TABLE "comments_closure"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
