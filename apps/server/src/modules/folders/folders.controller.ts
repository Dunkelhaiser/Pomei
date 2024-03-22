import { FastifyReply, FastifyRequest } from "fastify";
import { NewFolderInput } from "./folder.schema.ts";
import { createFolder } from "./folders.service.ts";

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
