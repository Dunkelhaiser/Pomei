import {
    Folder,
    FoldersPaginated,
    GetFolderInput,
    GetFolderPaginatedInput,
    NewFolderInput,
} from "shared-types/folders";
import { GetNotePaginatedInput, NotesPaginated, SearchNotesPaginatedInput } from "shared-types/notes";
import { GetByIdInput } from "shared-types/shared";
import { api } from "../api";

export const getFolders = async (input: GetFolderPaginatedInput) => {
    const res = await api.get("folders", { searchParams: input, credentials: "include" }).json<FoldersPaginated>();
    return res;
};

export const searchFolders = async (input: GetFolderInput) => {
    const res = await api.get("folders/search", { searchParams: input, credentials: "include" }).json<Folder[]>();
    return res;
};

export const createFolder = async (input: NewFolderInput) => {
    const res = await api.post("folders", { json: input, credentials: "include" }).json<Folder>();
    return res;
};

export const editFolder = async (input: NewFolderInput, params: GetByIdInput) => {
    const res = await api.put(`folders/${params.id}`, { json: input, credentials: "include" }).json<Folder>();
    return res;
};

export const deleteFolder = async (params: GetByIdInput) => {
    await api.delete(`folders/${params.id}`, { credentials: "include" });
};

export const deleteFolderWithNotes = async (params: GetByIdInput) => {
    await api.delete(`folders/${params.id}/notes`, { credentials: "include" });
};

export const loadFolder = async (params: GetByIdInput, input: GetNotePaginatedInput) => {
    const res = await api
        .get(`folders/${params.id}`, { searchParams: input, credentials: "include" })
        .json<NotesPaginated>();
    return res;
};

export const searchFolderContent = async (params: GetByIdInput, input: SearchNotesPaginatedInput) => {
    const res = await api
        .get(`folders/${params.id}/search`, { searchParams: input, credentials: "include" })
        .json<NotesPaginated>();
    return res;
};

export const getFolderInfo = async (params: GetByIdInput) => {
    const res = await api.get(`folders/${params.id}/info`, { credentials: "include" }).json<Folder>();
    return res;
};
