import {
    ArchiveInput,
    GetNotePaginatedInput,
    GetNotesInput,
    MoveToBinInput,
    Note,
    NotesPaginated,
} from "shared-types/notes";
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

export const getArchive = async (input: GetNotePaginatedInput) => {
    const res = await api.get("notes/archive", { searchParams: input, credentials: "include" }).json<NotesPaginated>();
    return res;
};

export const searchArchive = async (input: GetNotesInput) => {
    const res = await api.get("notes/archive/search", { searchParams: input, credentials: "include" }).json<Note[]>();
    return res;
};

export const duplicateNote = async (params: GetByIdInput) => {
    const res = await api.post(`notes/duplicate/${params.id}`, { json: null, credentials: "include" }).json<Note>();
    return res;
};

export const moveToBin = async (input: MoveToBinInput, params: GetByIdInput) => {
    const res = await api.put(`notes/bin/${params.id}`, { json: input, credentials: "include" }).json<Note>();
    return res;
};

export const deleteNote = async (params: GetByIdInput) => {
    await api.delete(`notes/${params.id}`, { credentials: "include" });
};

export const getBin = async () => {
    const res = await api.get("notes/bin", { credentials: "include" }).json<Note[]>();
    return res;
};

export const emptyBin = async () => {
    await api.delete("notes/bin", { credentials: "include" });
};
