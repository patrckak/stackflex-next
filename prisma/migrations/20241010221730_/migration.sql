-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "operator" BOOLEAN NOT NULL DEFAULT false,
    "verification" TEXT,
    "isVerificated" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "LastModify" DATETIME NOT NULL,
    "avatar" TEXT NOT NULL,
    "cnpj" TEXT,
    "enterpriseAccount" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
