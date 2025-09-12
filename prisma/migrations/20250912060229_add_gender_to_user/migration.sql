/*
  Warnings:

  - The `language` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('ENGLISH', 'HINDI', 'KANNADA', 'TELUGU');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "gender" "public"."Gender",
ADD COLUMN     "onboardAt" TIMESTAMP(3),
ALTER COLUMN "name" DROP DEFAULT,
ALTER COLUMN "about" DROP NOT NULL,
ALTER COLUMN "about" DROP DEFAULT,
ALTER COLUMN "dImage" DROP NOT NULL,
ALTER COLUMN "dImage" DROP DEFAULT,
ALTER COLUMN "bImage" DROP NOT NULL,
ALTER COLUMN "bImage" DROP DEFAULT,
ALTER COLUMN "occupation" DROP NOT NULL,
ALTER COLUMN "occupation" DROP DEFAULT,
DROP COLUMN "language",
ADD COLUMN     "language" "public"."Language",
ALTER COLUMN "district" DROP NOT NULL,
ALTER COLUMN "district" DROP DEFAULT,
ALTER COLUMN "passion" DROP NOT NULL,
ALTER COLUMN "passion" DROP DEFAULT,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "state" DROP DEFAULT;
