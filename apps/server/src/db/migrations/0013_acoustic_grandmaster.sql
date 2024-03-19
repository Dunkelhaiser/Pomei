ALTER TABLE "notes" ALTER COLUMN "tags" SET DEFAULT array[]::varchar[];--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "tags" SET NOT NULL;