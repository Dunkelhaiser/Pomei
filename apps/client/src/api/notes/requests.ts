import { GetNotePaginatedInput, GetNotesInput, Note, NotesPaginated } from "shared-types/notes";
import { api } from "../api";

export const getNotes = async (input: GetNotePaginatedInput) => {
    const res = await api.get("notes", { searchParams: input, credentials: "include" }).json<NotesPaginated>();
    return res;
};

export const searchNotes = async (input: GetNotesInput) => {
    const res = await api.get("notes/search", { searchParams: input, credentials: "include" }).json<Note[]>();
    return res;
};
