/*
  Warnings:

  - Changed the type of `isActive` on the `Mappingcode` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Mappingcode" DROP COLUMN "isActive",
ADD COLUMN     "isActive" "Status" NOT NULL;

-- DropEnum
DROP TYPE "isActive";
