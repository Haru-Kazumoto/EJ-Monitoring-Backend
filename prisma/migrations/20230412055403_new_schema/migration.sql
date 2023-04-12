/*
  Warnings:

  - You are about to drop the column `bookId` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `mediaSocialId` on the `Author` table. All the data in the column will be lost.
  - Changed the type of `genre` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "bookId",
DROP COLUMN "mediaSocialId";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "genre",
ADD COLUMN     "genre" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Genre";
