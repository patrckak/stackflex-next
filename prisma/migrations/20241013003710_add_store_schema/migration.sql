/*
  Warnings:

  - You are about to drop the column `cnpj` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `operator` on the `User` table. All the data in the column will be lost.
  - The required column `private_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "private_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "verification" TEXT,
    "isVerificated" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "LastModify" DATETIME NOT NULL,
    "avatar" TEXT NOT NULL,
    "enterpriseAccount" BOOLEAN NOT NULL DEFAULT false,
    "storeId" TEXT
);
INSERT INTO "new_User" ("LastModify", "avatar", "email", "enterpriseAccount", "id", "isVerificated", "password", "username", "verification") SELECT "LastModify", "avatar", "email", "enterpriseAccount", "id", "isVerificated", "password", "username", "verification" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_private_id_key" ON "User"("private_id");
CREATE INDEX "User_storeId_idx" ON "User"("storeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Store_id_key" ON "Store"("id");
