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
