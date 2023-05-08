-- CreateTable
CREATE TABLE "Menus" (
    "id_menu" SERIAL NOT NULL,
    "menu_name" TEXT NOT NULL,
    "path_route" TEXT NOT NULL,
    "parent_id" INTEGER NOT NULL,

    CONSTRAINT "Menus_pkey" PRIMARY KEY ("id_menu")
);

-- CreateTable
CREATE TABLE "MenuRoles" (
    "id_menu_roles" SERIAL NOT NULL,
    "menu_id" INTEGER,
    "role_id" INTEGER,
    "id_role" INTEGER,
    "id_menu" INTEGER,

    CONSTRAINT "MenuRoles_pkey" PRIMARY KEY ("id_menu_roles")
);

-- AddForeignKey
ALTER TABLE "MenuRoles" ADD CONSTRAINT "MenuRoles_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "Role"("id_role") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuRoles" ADD CONSTRAINT "MenuRoles_id_menu_fkey" FOREIGN KEY ("id_menu") REFERENCES "Menus"("id_menu") ON DELETE SET NULL ON UPDATE CASCADE;
