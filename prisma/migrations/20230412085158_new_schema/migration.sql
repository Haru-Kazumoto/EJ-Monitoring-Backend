/*
  Warnings:

  - You are about to drop the column `city` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `district` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `bachelor` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `studentNumber` on the `Student` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Student_studentNumber_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "city",
DROP COLUMN "district";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "bachelor",
DROP COLUMN "studentNumber";
