/*
  Warnings:

  - You are about to drop the column `id_menu` on the `MenuRoles` table. All the data in the column will be lost.
  - You are about to drop the column `id_role` on the `MenuRoles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MenuRoles" DROP CONSTRAINT "MenuRoles_id_menu_fkey";

-- DropForeignKey
ALTER TABLE "MenuRoles" DROP CONSTRAINT "MenuRoles_id_role_fkey";

-- AlterTable
ALTER TABLE "MenuRoles" DROP COLUMN "id_menu",
DROP COLUMN "id_role";

-- CreateTable
CREATE TABLE "_MenuRolesToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MenuRolesToMenus" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MenuRolesToRole_AB_unique" ON "_MenuRolesToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_MenuRolesToRole_B_index" ON "_MenuRolesToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MenuRolesToMenus_AB_unique" ON "_MenuRolesToMenus"("A", "B");

-- CreateIndex
CREATE INDEX "_MenuRolesToMenus_B_index" ON "_MenuRolesToMenus"("B");

-- AddForeignKey
ALTER TABLE "_MenuRolesToRole" ADD CONSTRAINT "_MenuRolesToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "MenuRoles"("id_menu_roles") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuRolesToRole" ADD CONSTRAINT "_MenuRolesToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id_role") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuRolesToMenus" ADD CONSTRAINT "_MenuRolesToMenus_A_fkey" FOREIGN KEY ("A") REFERENCES "MenuRoles"("id_menu_roles") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuRolesToMenus" ADD CONSTRAINT "_MenuRolesToMenus_B_fkey" FOREIGN KEY ("B") REFERENCES "Menus"("id_menu") ON DELETE CASCADE ON UPDATE CASCADE;
