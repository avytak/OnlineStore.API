CREATE TYPE "public"."roles" AS ENUM('admin', 'user');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "first_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;  -- Remove default value
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE roles USING role::roles;
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';  -- Set default value again
ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "birth_day" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "isVerify" boolean;
