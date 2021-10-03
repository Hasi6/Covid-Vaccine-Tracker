/*
  Warnings:

  - You are about to drop the column `timeRange` on the `Location` table. All the data in the column will be lost.
  - Added the required column `fromTime` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toTime` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "timeRange",
ADD COLUMN     "fromTime" TEXT NOT NULL,
ADD COLUMN     "toTime" TEXT NOT NULL;
