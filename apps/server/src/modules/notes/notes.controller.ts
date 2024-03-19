import { FastifyReply, FastifyRequest } from "fastify";
import { NewNoteInput } from "./notes.schema.ts";
import { createNote } from "./notes.service.ts";

export const createNoteHandler = async (req: FastifyRequest<{ Body: NewNoteInput }>, res: FastifyReply) => {
    try {
        const newNote = await createNote(req.body, req.user.id);
        return res.code(201).send(newNote);
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to create note");
    }
};
