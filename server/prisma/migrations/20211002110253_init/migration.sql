/*
  Warnings:

  - You are about to drop the column `profileId` on the `Vaccine` table. All the data in the column will be lost.
  - Added the required column `vaccineId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vaccine" DROP CONSTRAINT "Vaccine_profileId_fkey";

-- DropIndex
DROP INDEX "Vaccine_profileId_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "vaccineId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vaccine" DROP COLUMN "profileId";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_vaccineId_fkey" FOREIGN KEY ("vaccineId") REFERENCES "Vaccine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
