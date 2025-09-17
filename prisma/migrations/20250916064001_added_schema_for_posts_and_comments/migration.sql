-- CreateEnum
CREATE TYPE "public"."PostCategory" AS ENUM ('GENERAL', 'TECH', 'ART', 'LIFESTYLE', 'EDUCATION', 'ENTERTAINMENT');

-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "category" "public"."PostCategory" NOT NULL DEFAULT 'GENERAL';

-- CreateIndex
CREATE INDEX "Post_category_idx" ON "public"."Post"("category");
