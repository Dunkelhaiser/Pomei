import { and, desc, eq } from "drizzle-orm";
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

export const getLastNoteOrder = async (userId: string) => {
    const lastNote = await db
        .select({ order: notes.order })
        .from(notes)
        .where(eq(notes.userId, userId))
        .orderBy(desc(notes.order))
        .limit(1);
    return lastNote.length ? lastNote[0].order : null;
};

export const getNoteByOrder = async (order: number, userId: string) => {
    const note = await db
        .select()
        .from(notes)
        .where(and(eq(notes.order, order), eq(notes.userId, userId)));
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
    const oldOrder = note.order;
    const noteToSwap = await getNoteByOrder(order, userId);
    if (!noteToSwap) {
        const [editedNote] = await db.update(notes).set({ order }).where(eq(notes.id, id)).returning();
        return editedNote;
    }

    const [editedNote] = await db.update(notes).set({ order: noteToSwap.order }).where(eq(notes.id, id)).returning();
    await db.update(notes).set({ order: oldOrder }).where(eq(notes.id, noteToSwap.id));

    return editedNote;
};

export const archiveNote = async (id: string, archive: boolean, userId: string) => {
    const note = await getNote(id, userId);
    if (!note) {
        return null;
    }
    const [archivedNote] = await db.update(notes).set({ isArchived: archive }).where(eq(notes.id, id)).returning();
    return archivedNote;
};

export const getArchive = async (userId: string) => {
    const archive = await db
        .select()
        .from(notes)
        .where(and(eq(notes.userId, userId), eq(notes.isArchived, true)));
    return archive;
};

export const moveToBin = async (id: string, move: boolean, userId: string) => {
    const note = await getNote(id, userId);
    if (!note) {
        return null;
    }
    const [deletedNote] = await db.update(notes).set({ isDeleted: move }).where(eq(notes.id, id)).returning();
    return deletedNote;
};

export const deleteNote = async (id: string, userId: string) => {
    const note = await getNote(id, userId);
    if (!note) {
        return null;
    }
    await db.delete(notes).where(eq(notes.id, id));
    return note;
};

export const emptyBin = async (userId: string) => {
    await db.delete(notes).where(and(eq(notes.userId, userId), eq(notes.isDeleted, true)));
};

export const getBin = async (userId: string) => {
    const bin = await db
        .select()
        .from(notes)
        .where(and(eq(notes.userId, userId), eq(notes.isDeleted, true)));
    return bin;
};
