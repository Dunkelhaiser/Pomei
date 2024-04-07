import { FastifyReply, FastifyRequest } from "fastify";
import { GetFolderInput, GetFolderPaginatedInput, NewFolderInput, GetByIdInput, OrderInput } from "shared-types";
import {
    createFolder,
    deleteFolder,
    editFolder,
    getAllFolders,
    getAllFoldersPaginated,
    loadFolderContent,
    reorderFolder,
    searchFolder,
} from "./folders.service.ts";

export const createFolderHandler = async (req: FastifyRequest<{ Body: NewFolderInput }>, res: FastifyReply) => {
    try {
        const folder = await createFolder(req.body, req.user.id);
        return res.code(201).send(folder);
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to create folder");
    }
};

export const getAllFoldersHandler = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const folders = await getAllFolders(req.user.id);
        return res.code(200).send(folders);
    } catch (err) {
        return res.code(500).send("Failed to get folders");
    }
};

export const getAllFoldersPaginatedHandler = async (
    req: FastifyRequest<{ Querystring: GetFolderPaginatedInput }>,
    res: FastifyReply
) => {
    const { page, limit, orderBy, isAscending } = req.query;
    try {
        const data = await getAllFoldersPaginated(req.user.id, limit, page, orderBy, isAscending);
        return res.code(200).send(data);
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to get folders");
    }
};

export const searchFolderHandler = async (req: FastifyRequest<{ Querystring: GetFolderInput }>, res: FastifyReply) => {
    try {
        const folders = await searchFolder(req.query.name, req.user.id);
        return res.code(200).send(folders);
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to search for folders");
    }
};

export const loadFolderContentHandler = async (req: FastifyRequest<{ Params: GetByIdInput }>, res: FastifyReply) => {
    try {
        const folderContent = await loadFolderContent(req.params.id, req.user.id);
        if (folderContent) {
            return res.code(200).send(folderContent);
        }
        return res.code(404).send({ message: "Folder not found" });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to get folder content");
    }
};

export const deleteFolderHandler = async (req: FastifyRequest<{ Params: GetByIdInput }>, res: FastifyReply) => {
    try {
        const folder = await deleteFolder(req.params.id, req.user.id);
        if (folder) {
            return res.code(204).send();
        }
        return res.code(404).send({ message: "Folder not found" });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to delete folder");
    }
};

export const editFolderHandler = async (
    req: FastifyRequest<{ Params: GetByIdInput; Body: NewFolderInput }>,
    res: FastifyReply
) => {
    try {
        const folder = await editFolder(req.params.id, req.body, req.user.id);
        if (folder) {
            return res.code(200).send(folder);
        }
        return res.code(404).send({ message: "Folder not found" });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to edit folder");
    }
};

export const reorderFolderHandler = async (
    req: FastifyRequest<{ Params: GetByIdInput; Body: OrderInput }>,
    res: FastifyReply
) => {
    try {
        const folder = await reorderFolder(req.params.id, req.body.order, req.user.id);
        if (folder) {
            return res.code(200).send(folder);
        }
        return res.code(404).send({ message: "Folder not found" });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to reorder folder");
    }
};
