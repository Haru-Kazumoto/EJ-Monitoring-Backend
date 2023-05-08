/*
  Warnings:

  - You are about to drop the column `id_role` on the `User` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_role_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "id_role",
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;
