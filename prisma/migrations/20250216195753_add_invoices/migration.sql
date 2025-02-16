-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "property_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "monthly_rent" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceVariantItem" (
    "id" SERIAL NOT NULL,
    "invoice_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "prev_reading" INTEGER NOT NULL DEFAULT 0,
    "current_reading" INTEGER NOT NULL DEFAULT 0,
    "amount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "InvoiceVariantItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_uuid_key" ON "Invoice"("uuid");

-- CreateIndex
CREATE INDEX "Invoice_year_month_idx" ON "Invoice"("year", "month");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE INDEX "InvoiceVariantItem_name_idx" ON "InvoiceVariantItem"("name");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceVariantItem" ADD CONSTRAINT "InvoiceVariantItem_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
