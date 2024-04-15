import { useState } from "react";
import { Note as NoteType } from "shared-types/notes";
import { useArchiveNote, useDeleteNote, useDuplicateNote, useMoveToBin } from "@/api/notes/hooks";
import AddToFolder from "@/dialogs/AddToFolder";
import DeleteNote from "@/dialogs/DeleteNote";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, EllipsisBtn } from "@/ui/DropdownMenu";

interface NoteProps {
    note: NoteType;
}

const NoteMenu = ({ note }: NoteProps) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [openAddToFolder, setOpenAddToFolder] = useState(false);

    const archiveNoteHandler = useArchiveNote();
    const duplicateNoteHandler = useDuplicateNote();
    const moveToBinHandler = useMoveToBin();
    const deleteNoteHandler = useDeleteNote();

    return (
        <>
            <DeleteNote id={note.id} open={openDelete} setOpen={setOpenDelete} />
            <AddToFolder id={note.id} open={openAddToFolder} setOpen={setOpenAddToFolder} />
            <DropdownMenu>
                <EllipsisBtn />
                <DropdownMenuContent>
                    {!note.isDeleted && (
                        <DropdownMenuItem onClick={() => duplicateNoteHandler.mutate({ id: note.id })}>
                            Duplicate
                        </DropdownMenuItem>
                    )}
                    {!note.isArchived &&
                        !note.isDeleted &&
                        (note.folderId ? (
                            <DropdownMenuItem onClick={() => setOpenAddToFolder(true)}>
                                Remove From Folder
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem onClick={() => setOpenAddToFolder(true)}>Add To Folder</DropdownMenuItem>
                        ))}
                    {!note.isDeleted && (
                        <DropdownMenuItem
                            onClick={() =>
                                archiveNoteHandler.mutate({
                                    input: { archive: !note.isArchived },
                                    params: { id: note.id },
                                })
                            }
                        >
                            {note.isArchived ? "Unarchive" : "Archive"}
                        </DropdownMenuItem>
                    )}
                    {!note.isDeleted ? (
                        <DropdownMenuItem
                            className={`
                                text-destructive
                                focus:text-destructive
                            `}
                            onClick={() => setOpenDelete(true)}
                        >
                            Delete
                        </DropdownMenuItem>
                    ) : (
                        <>
                            <DropdownMenuItem
                                onClick={() =>
                                    moveToBinHandler.mutate({
                                        input: { moveToBin: false },
                                        params: { id: note.id },
                                    })
                                }
                            >
                                Restore
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => deleteNoteHandler.mutate({ id: note.id })}
                                className={`
                                    text-destructive
                                    focus:text-destructive
                                `}
                            >
                                Delete
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default NoteMenu;
