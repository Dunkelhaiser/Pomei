import { useSetAtom } from "jotai";
import { useState } from "react";
import DeleteLocalNote from "@/dialogs/DeleteLocalNote";
import { LocalNote as LocalNoteType, notesAtom } from "@/store/Notes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, EllipsisBtn } from "@/ui/DropdownMenu";
import { generateId } from "@/utils/utils";

interface NoteProps {
    note: LocalNoteType;
}

const LocalNoteMenu = ({ note }: NoteProps) => {
    const [openDelete, setOpenDelete] = useState(false);
    const setNotes = useSetAtom(notesAtom);

    const duplicateNote = () => {
        setNotes((prev) => [
            ...prev,
            {
                ...note,
                id: generateId(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ]);
    };

    return (
        <>
            <DeleteLocalNote id={note.id} open={openDelete} setOpen={setOpenDelete} />
            <DropdownMenu>
                <EllipsisBtn />
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={duplicateNote}>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem
                        className={`
                            text-destructive
                            focus:text-destructive
                        `}
                        onClick={() => setOpenDelete(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default LocalNoteMenu;
