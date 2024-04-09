import {
    Folder,
    FoldersPaginated,
    GetFolderInput,
    GetFolderPaginatedInput,
    NewFolderInput,
} from "shared-types/folders";
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
