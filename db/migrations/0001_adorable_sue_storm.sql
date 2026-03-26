CREATE TYPE "public"."age_detail_type" AS ENUM('TAHUN', 'BULAN');--> statement-breakpoint
ALTER TABLE "data_anak" RENAME COLUMN "nama" TO "name";--> statement-breakpoint
ALTER TABLE "data_anak" RENAME COLUMN "usia" TO "age";--> statement-breakpoint
ALTER TABLE "data_anak" RENAME COLUMN "berat_badan" TO "weight";--> statement-breakpoint
ALTER TABLE "data_anak" RENAME COLUMN "tinggi_badan" TO "height";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "nama" TO "name";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "data_anak" ADD COLUMN "age_detail" "age_detail_type" DEFAULT 'TAHUN' NOT NULL;