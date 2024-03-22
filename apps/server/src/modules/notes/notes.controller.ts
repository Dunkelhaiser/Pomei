import { FastifyReply, FastifyRequest } from "fastify";
import { ArchiveInput, FolderIdInput, GetNoteInput, MoveToBinInput, NewNoteInput, OrderInput } from "./notes.schema.ts";
import {
    addToFolder,
    archiveNote,
    createNote,
    deleteNote,
    editNote,
    emptyBin,
    getAllNotes,
    getArchive,
    getBin,
    getNote,
    moveToBin,
    removeFromFolder,
    reorderNote,
} from "./notes.service.ts";

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

export const getAllNotesHandler = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const notes = await getAllNotes(req.user.id);
        return res.code(200).send(notes);
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to get notes");
    }
};

export const editNoteHandler = async (
    req: FastifyRequest<{ Params: GetNoteInput; Body: NewNoteInput }>,
    res: FastifyReply
) => {
    try {
        const note = await editNote(req.params.id, req.body, req.user.id);
        if (note) {
            return res.code(200).send(note);
        }
        return res.code(404).send({ message: "Note not found" });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to edit note");
    }
};

export const reorderNoteHandler = async (
    req: FastifyRequest<{ Params: GetNoteInput; Body: OrderInput }>,
    res: FastifyReply
) => {
    try {
        const note = await reorderNote(req.params.id, req.body.order, req.user.id);
        if (note) {
            return res.code(200).send(note);
        }
        return res.code(404).send({ message: "Note not found" });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to reorder note");
    }
};

export const archiveNoteHandler = async (
    req: FastifyRequest<{ Params: GetNoteInput; Body: ArchiveInput }>,
    res: FastifyReply
) => {
    try {
        const note = await archiveNote(req.params.id, req.body.archive, req.user.id);
        if (note) {
            return res.code(200).send(note);
        }
        return res.code(404).send({ message: "Note not found" });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to archive note");
    }
};

export const getArchiveHandler = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const archive = await getArchive(req.user.id);
        return res.code(200).send(archive);
    } catch (err) {
        return res.code(500).send("Failed to get archive");
    }
};

export const moveToBinHandler = async (
    req: FastifyRequest<{ Params: GetNoteInput; Body: MoveToBinInput }>,
    res: FastifyReply
) => {
    try {
        const note = await moveToBin(req.params.id, req.body.moveToBin, req.user.id);
        if (note) {
            return res.code(200).send(note);
        }
        return res.code(404).send({ message: "Note not found" });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send(`Failed to ${req.body.moveToBin ? "move note to bin" : "restore note"}`);
    }
};

export const deleteNoteHandler = async (req: FastifyRequest<{ Params: GetNoteInput }>, res: FastifyReply) => {
    try {
        const note = await deleteNote(req.params.id, req.user.id);
        if (note) {
            return res.code(204).send();
        }
        return res.code(404).send({ message: "Note not found" });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to delete note");
    }
};

export const emptyBinHandler = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        await emptyBin(req.user.id);
        return res.code(204).send();
    } catch (err) {
        return res.code(500).send("Failed to empty bin");
    }
};

export const getBinHandler = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const bin = await getBin(req.user.id);
        return res.code(200).send(bin);
    } catch (err) {
        return res.code(500).send("Failed to get bin");
    }
};

export const addToFolderHandler = async (
    req: FastifyRequest<{ Params: GetNoteInput; Body: FolderIdInput }>,
    res: FastifyReply
) => {
    try {
        const note = await addToFolder(req.params.id, req.body.folderId, req.user.id);
        if (note) {
            return res.code(200).send(note);
        }
        return res.code(404).send({ message: "Note not found" });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to add note to folder");
    }
};

export const removeFromFolderHandler = async (req: FastifyRequest<{ Params: GetNoteInput }>, res: FastifyReply) => {
    try {
        const note = await removeFromFolder(req.params.id, req.user.id);
        if (note) {
            return res.code(200).send(note);
        }
        return res.code(404).send({ message: "Note not found" });
    } catch (err) {
        if (err instanceof Error) {
            return res.code(400).send({ message: err.message });
        }
        return res.code(500).send("Failed to remove note from folder");
    }
};
