/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `Property` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `Tenant` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Property_uuid_key" ON "Property"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_uuid_key" ON "Tenant"("uuid");
