import { text, varchar, timestamp, pgTable, uuid, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable(
    "users",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        email: varchar("email", { length: 320 }).notNull().unique(),
        username: varchar("username", { length: 20 }).notNull().unique(),
        firstName: varchar("first_name", { length: 30 }),
        lastName: varchar("last_name", { length: 30 }),
        password: text("password").notNull(),
        verifiedAt: timestamp("verified_at"),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow(),
    },
    (table) => ({
        usernameIdx: uniqueIndex("username_idx").on(table.username),
        emailIdx: uniqueIndex("email_idx").on(table.email),
    })
);

export const sessions = pgTable("sessions", {
    id: text("id").primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id),
    expiresAt: timestamp("expires_at").notNull(),
});
