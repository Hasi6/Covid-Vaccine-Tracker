/*
  Warnings:

  - Added the required column `fromDate` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toDate` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "fromDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "toDate" TIMESTAMP(3) NOT NULL;
