DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'visa_types_destination_id_type_unique'
    ) THEN
        ALTER TABLE "visa_types" ADD CONSTRAINT "visa_types_destination_id_type_unique" UNIQUE("destination_id","type");
    END IF;
END $$;