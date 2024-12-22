-- AddForeignKey
ALTER TABLE "RentVariant" ADD CONSTRAINT "RentVariant_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
