import { FastifyReply, FastifyRequest } from "fastify";
import { GetNoteInput, NewNoteInput } from "./notes.schema.ts";
import { createNote, getNote } from "./notes.service.ts";

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

export const getNoteHandler = async (req: FastifyRequest<{ Params: GetNoteInput }>, res: FastifyReply) => {
    try {
        const note = await getNote(req.params.id, req.user.id);
        if (note) {
            return res.code(200).send(note);
        }
        return res.code(404).send({ message: "Note not found" });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to get note");
    }
};
