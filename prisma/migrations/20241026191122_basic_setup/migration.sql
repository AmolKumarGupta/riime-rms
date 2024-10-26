/*
  Warnings:

  - You are about to drop the column `monthlyRent` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Tenant` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `Tenant` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billing_date` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starting_date` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Tenant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tenant_email_key";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "monthlyRent",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "monthly_rent" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "email",
DROP COLUMN "propertyId",
ADD COLUMN     "billing_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "property_id" INTEGER,
ADD COLUMN     "starting_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;
