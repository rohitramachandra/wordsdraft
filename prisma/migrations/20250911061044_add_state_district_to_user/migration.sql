/*
  Warnings:

  - You are about to drop the column `profession` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "profession",
ADD COLUMN     "district" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "passion" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "state" TEXT NOT NULL DEFAULT '';
