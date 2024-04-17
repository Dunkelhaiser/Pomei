import {
    ArchiveInput,
    GetNotePaginatedInput,
    MoveToBinInput,
    NewNoteInput,
    Note,
    NotesPaginated,
    SearchNotesPaginatedInput,
} from "shared-types/notes";
import { GetByIdInput } from "shared-types/shared";
import { api } from "../api";

export const getNotes = async (input: GetNotePaginatedInput) => {
    const res = await api.get("notes", { searchParams: input, credentials: "include" }).json<NotesPaginated>();
    return res;
};

export const searchNotes = async (input: SearchNotesPaginatedInput) => {
    const res = await api.get("notes/search", { searchParams: input, credentials: "include" }).json<NotesPaginated>();
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

export const searchArchive = async (input: SearchNotesPaginatedInput) => {
    const res = await api
        .get("notes/archive/search", { searchParams: input, credentials: "include" })
        .json<NotesPaginated>();
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

export const getBin = async (input: GetNotePaginatedInput) => {
    const res = await api.get("notes/bin", { searchParams: input, credentials: "include" }).json<NotesPaginated>();
    return res;
};

export const searchBin = async (input: SearchNotesPaginatedInput) => {
    const res = await api
        .get("notes/bin/search", { searchParams: input, credentials: "include" })
        .json<NotesPaginated>();
    return res;
};

export const emptyBin = async () => {
    await api.delete("notes/bin", { credentials: "include" });
};

export const addToFolder = async (params: GetByIdInput, input: GetByIdInput) => {
    const res = await api.put(`notes/folder/${params.id}`, { json: input, credentials: "include" }).json<Note>();
    return res;
};

export const removeFromFolder = async (params: GetByIdInput) => {
    const res = await api.delete(`notes/folder/${params.id}`, { credentials: "include" }).json<Note>();
    return res;
};

export const getNote = async (params: GetByIdInput) => {
    const res = await api.get(`notes/${params.id}`, { credentials: "include" }).json<Note>();
    return res;
};

export const createNote = async (input: NewNoteInput) => {
    const res = await api.post("notes", { json: input, credentials: "include" }).json<Note>();
    return res;
};

export const editNote = async (params: GetByIdInput, input: NewNoteInput) => {
    const res = await api.put(`notes/${params.id}`, { json: input, credentials: "include" }).json<Note>();
    return res;
};
