-- CreateEnum
CREATE TYPE "StatusCode" AS ENUM ('Sukses', 'Gagal');

-- CreateEnum
CREATE TYPE "isActive" AS ENUM ('Yes', 'No');

-- CreateTable
CREATE TABLE "Mappingcode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "status" "StatusCode" NOT NULL,
    "isActive" "isActive" NOT NULL,
    "priority" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Mappingcode_pkey" PRIMARY KEY ("id")
);
