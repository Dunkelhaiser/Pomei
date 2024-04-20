import { useSetAtom } from "jotai";
import { toast } from "sonner";
import { notesAtom } from "@/store/Notes";
import Button from "@/ui/Button";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/ui/Modal";

interface Props {
    id: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const DeleteLocalNote = ({ id, open, setOpen }: Props) => {
    const setNotes = useSetAtom(notesAtom);

    const deleteNote = async () => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        setOpen(false);
        toast.success("Note deleted successfully.");
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete note?</AlertDialogTitle>
                    <AlertDialogDescription>Note will be permanently deleted.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button type="button" variant="destructive" onClick={deleteNote}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteLocalNote;
