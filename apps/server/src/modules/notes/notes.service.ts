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

export const getAllNotes = async (userId: string) => {
    const notesArr = await db.select().from(notes).where(eq(notes.userId, userId));
    return notesArr;
};

export const editNote = async (id: string, input: NewNoteInput, userId: string) => {
    const note = await getNote(id, userId);
    if (!note) {
        return null;
    }
    const updatedNote = { ...note, ...input };
    const [editedNote] = await db.update(notes).set(updatedNote).where(eq(notes.id, id)).returning();
    return editedNote;
};

export const reorderNote = async (id: string, order: number, userId: string) => {
    const note = await getNote(id, userId);
    if (!note) {
        return null;
    }
    const [editedNote] = await db.update(notes).set({ order }).where(eq(notes.id, id)).returning();
    return editedNote;
};
