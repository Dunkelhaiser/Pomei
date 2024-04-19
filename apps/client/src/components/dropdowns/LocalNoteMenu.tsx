import { useSetAtom } from "jotai";
import { LocalNote as LocalNoteType, notesAtom } from "@/store/Notes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, EllipsisBtn } from "@/ui/DropdownMenu";
import { generateId } from "@/utils/utils";

interface NoteProps {
    note: LocalNoteType;
}

const LocalNoteMenu = ({ note }: NoteProps) => {
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

    const deleteNote = () => {
        setNotes((prev) => prev.filter((n) => n.id !== note.id));
    };

    return (
        <DropdownMenu>
            <EllipsisBtn />
            <DropdownMenuContent>
                <DropdownMenuItem onClick={duplicateNote}>Duplicate</DropdownMenuItem>
                <DropdownMenuItem
                    className={`
                        text-destructive
                        focus:text-destructive
                    `}
                    onClick={deleteNote}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LocalNoteMenu;
