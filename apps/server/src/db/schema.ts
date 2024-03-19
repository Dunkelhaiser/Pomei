import { text, varchar, timestamp, pgTable, uuid, uniqueIndex, integer, boolean, index } from "drizzle-orm/pg-core";

export const users = pgTable(
    "users",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        email: varchar("email", { length: 320 }).notNull().unique(),
        password: text("password").notNull(),
        verifiedAt: timestamp("verified_at"),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow(),
    },
    (table) => ({
        emailIdx: uniqueIndex("email_idx").on(table.email),
    })
);

export const sessions = pgTable("sessions", {
    id: text("id").primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at").notNull(),
});

export const verificationCodes = pgTable("verification_codes", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    code: text("code").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const passwordResetCodes = pgTable("password_reset_codes", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const notes = pgTable(
    "notes",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        title: varchar("title", { length: 255 }),
        content: text("content"),
        order: integer("order").notNull().default(0),
        tags: varchar("tags", { length: 20 }).array(),
        isArchived: boolean("is_archived").notNull().default(false),
        isDeleted: boolean("is_deleted").notNull().default(false),
        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        folderId: uuid("folder_id").references(() => folders.id, { onDelete: "set null" }),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow(),
    },
    (table) => ({
        titleIdx: index("title_idx").on(table.title),
        contentIdx: index("content_idx").on(table.content),
    })
);

export const folders = pgTable(
    "folders",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        name: varchar("name", { length: 25 }),
        color: varchar("color", { length: 7 }),
        order: integer("order").notNull().default(0),
        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow(),
    },
    (table) => ({
        nameIdx: uniqueIndex("name_idx").on(table.name),
    })
);
