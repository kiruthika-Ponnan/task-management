import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTaskSchema1710000000000 implements MigrationInterface {
    name = 'UpdateTaskSchema1710000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop old columns
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN IF EXISTS "status"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN IF EXISTS "due_date"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN IF EXISTS "created_at"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN IF EXISTS "updated_at"`);

        // Add new columns
        await queryRunner.query(`ALTER TABLE "tasks" ADD "completed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);

        // Make description non-nullable if it was nullable before
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "description" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert changes
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "updatedAt"`);

        // Restore old columns
        await queryRunner.query(`ALTER TABLE "tasks" ADD "status" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "due_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);

        // Make description nullable again
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "description" DROP NOT NULL`);
    }
} 