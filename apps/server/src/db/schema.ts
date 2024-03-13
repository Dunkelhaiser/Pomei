import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    username: text("username").notNull().unique(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    password: text("password").notNull(),
    verifiedAt: timestamp("verified_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
