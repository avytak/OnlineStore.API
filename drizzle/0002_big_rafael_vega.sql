CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(20) NOT NULL,
	"last_name" varchar(20) NOT NULL,
	"role" varchar(10) DEFAULT 'user' NOT NULL,
	"email" varchar(20) NOT NULL,
	"password" varchar(70) NOT NULL,
	"token" varchar(100) DEFAULT null
);
