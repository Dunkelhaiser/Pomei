import { FastifyReply, FastifyRequest } from "fastify";
import { GetFolderInput, NewFolderInput } from "./folder.schema.ts";
import { createFolder, deleteFolder, getAllFolders, loadFolderContent } from "./folders.service.ts";

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

export const loadFolderContentHandler = async (req: FastifyRequest<{ Params: GetFolderInput }>, res: FastifyReply) => {
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

export const deleteFolderHandler = async (req: FastifyRequest<{ Params: GetFolderInput }>, res: FastifyReply) => {
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
