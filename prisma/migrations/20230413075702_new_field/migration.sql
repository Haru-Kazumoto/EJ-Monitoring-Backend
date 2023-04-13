/*
  Warnings:

  - You are about to drop the column `bachelor` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_studentId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "bachelor";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
