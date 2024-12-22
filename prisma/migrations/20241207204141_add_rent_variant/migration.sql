-- CreateTable
CREATE TABLE "RentVariant" (
    "id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "initial" INTEGER NOT NULL,
    "current" INTEGER NOT NULL,

    CONSTRAINT "RentVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RentVariant_property_id_idx" ON "RentVariant" USING HASH ("property_id");
