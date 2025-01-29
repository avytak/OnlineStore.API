CREATE TABLE "orders" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "orders_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"total_price" numeric(5, 2) NOT NULL,
	"status" integer NOT NULL,
	"first_name" varchar(20) NOT NULL,
	"last_name" varchar(20) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"shipping-address" text NOT NULL,
	"payment_type" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
