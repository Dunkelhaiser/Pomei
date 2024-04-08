import {
    ArchiveInput,
    GetNotePaginatedInput,
    GetNotesInput,
    MoveToBinInput,
    Note,
    NotesPaginated,
} from "shared-types/notes";
import { GetByIdInput } from "shared-types/shared";
import { EmptyResponse } from "shared-types/utilSchema";
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

export const duplicateNote = async (params: GetByIdInput) => {
    const res = await api.post(`notes/duplicate/${params.id}`, { json: null, credentials: "include" }).json<Note>();
    return res;
};

export const moveToBin = async (input: MoveToBinInput, params: GetByIdInput) => {
    const res = await api.put(`notes/bin/${params.id}`, { json: input, credentials: "include" }).json<Note>();
    return res;
};

export const deleteNote = async (params: GetByIdInput) => {
    const res = await api.delete(`notes/${params.id}`, { credentials: "include" }).json<EmptyResponse>();
    return res;
};

export const getBin = async () => {
    const res = await api.get("notes/bin", { credentials: "include" }).json<Note[]>();
    return res;
};

export const emptyBin = async () => {
    const res = await api.delete("notes/bin", { credentials: "include" }).json<EmptyResponse>();
    return res;
};
