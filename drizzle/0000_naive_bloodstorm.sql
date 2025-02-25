CREATE TYPE "public"."statuses" AS ENUM('processing', 'sent', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TABLE "categories" (

);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "orders_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"status" "statuses" DEFAULT 'processing',
	"payment_type" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"category" varchar(100) NOT NULL,
	"image_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "product_id_unique" UNIQUE("id")
);
--> statement-breakpoint
<<<<<<<< HEAD:drizzle/0000_needy_bromley.sql
CREATE TABLE "userAddress" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "userAddress_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"street" varchar(100),
	"city" varchar(100),
	"state" varchar(100),
	"postal_code" varchar(20),
	"country" varchar(100)
========
CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"discount_price" numeric(10, 2),
	"image_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "products_id_unique" UNIQUE("id")
>>>>>>>> bugfix/docker-configs:drizzle/0000_naive_bloodstorm.sql
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(20) NOT NULL,
	"last_name" varchar(20) NOT NULL,
	"role" varchar(10) DEFAULT 'user' NOT NULL,
	"email" varchar(20) NOT NULL,
	"password" varchar(70) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;