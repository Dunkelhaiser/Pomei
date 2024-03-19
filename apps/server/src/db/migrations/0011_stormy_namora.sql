DROP INDEX IF EXISTS "title_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "content_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "notes" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "content_idx" ON "notes" ("content");