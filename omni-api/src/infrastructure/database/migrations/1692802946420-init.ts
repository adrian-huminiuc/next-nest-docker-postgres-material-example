import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1692802946420 implements MigrationInterface {
    name = 'Init1692802946420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "full_address" character varying NOT NULL, "phone_number" character varying NOT NULL, "birthday" date NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "event_types" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_d5110ab69f4aacfe41fecdf4fcd" UNIQUE ("name"), CONSTRAINT "PK_095b4746edcbfd9687b0a22e447" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "events" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_type_uuid" uuid NOT NULL, "name" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f1ae990f4f98735f0285a949690" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "event_subscriptions" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_uuid" uuid, "event_uuid" uuid, CONSTRAINT "PK_2c76d8254e3746d3c1f662deefb" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_2576f4bc1e594f225010a6cbda7" FOREIGN KEY ("event_type_uuid") REFERENCES "event_types"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_subscriptions" ADD CONSTRAINT "FK_11e3f1bd90995668de338fc41bf" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_subscriptions" ADD CONSTRAINT "FK_80a6eefd868f4a9b18f41d6fb17" FOREIGN KEY ("event_uuid") REFERENCES "events"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_subscriptions" DROP CONSTRAINT "FK_80a6eefd868f4a9b18f41d6fb17"`);
        await queryRunner.query(`ALTER TABLE "event_subscriptions" DROP CONSTRAINT "FK_11e3f1bd90995668de338fc41bf"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_2576f4bc1e594f225010a6cbda7"`);
        await queryRunner.query(`DROP TABLE "event_subscriptions"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "event_types"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
