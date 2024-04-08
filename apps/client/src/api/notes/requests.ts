import { ArchiveInput, GetNotePaginatedInput, GetNotesInput, Note, NotesPaginated } from "shared-types/notes";
import { GetByIdInput } from "shared-types/shared";
import { api } from "../api";

export const getNotes = async (input: GetNotePaginatedInput) => {
    const res = await api.get("notes", { searchParams: input, credentials: "include" }).json<NotesPaginated>();
    return res;
};

export const searchNotes = async (input: GetNotesInput) => {
    const res = await api.get("notes/search", { searchParams: input, credentials: "include" }).json<Note[]>();
    return res;
};

export const archiveNote = async (input: ArchiveInput, params: GetByIdInput) => {
    const res = await api.put(`notes/archive/${params.id}`, { json: input, credentials: "include" }).json<Note>();
    return res;
};

export const getArchive = async () => {
    const res = await api.get("notes/archive", { credentials: "include" }).json<Note[]>();
    return res;
};
