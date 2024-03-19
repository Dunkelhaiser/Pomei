import { and, eq } from "drizzle-orm";
import { NewNoteInput } from "./notes.schema.ts";
import { db } from "@/db/client.ts";
import { notes } from "@/db/schema.ts";

export const createNote = async (input: NewNoteInput, userId: string) => {
    const [newNote] = await db
        .insert(notes)
        .values({
            ...input,
            userId,
        })
        .returning();
    return newNote;
};

export const getNote = async (id: string, userId: string) => {
    const note = await db
        .select()
        .from(notes)
        .where(and(eq(notes.id, id), eq(notes.userId, userId)));
    return note.length ? note[0] : null;
};
