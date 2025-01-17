/*
  Warnings:

  - Added the required column `birthMonth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthYear` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `birthDate` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthMonth" INTEGER NOT NULL,
ADD COLUMN     "birthYear" INTEGER NOT NULL,
DROP COLUMN "birthDate",
ADD COLUMN     "birthDate" INTEGER NOT NULL;
