import { useState } from "react";
import { useDeleteNote, useMoveToBin } from "@/api/notes/hooks";
import Button from "@/ui/Button";
import { Checkbox } from "@/ui/Checkbox";
import Label from "@/ui/Label";
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

const DeleteNote = ({ id, open, setOpen }: Props) => {
    const [permanently, setPermanently] = useState<"indeterminate" | boolean>(false);
    const moveToBinHandler = useMoveToBin();
    const deleteNoteHandler = useDeleteNote();

    const onSubmit = async () => {
        if (permanently) {
            await deleteNoteHandler.mutateAsync({ id });
        } else {
            await moveToBinHandler.mutateAsync({
                input: { moveToBin: true },
                params: { id },
            });
        }
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete note?</AlertDialogTitle>
                    <AlertDialogDescription>Note will be moved to the bin.</AlertDialogDescription>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="permanently"
                            checked={permanently}
                            onCheckedChange={(value) => setPermanently(value)}
                        />
                        <Label htmlFor="permanently">Delete permanently</Label>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        type="button"
                        variant="destructive"
                        loading={deleteNoteHandler.isPending || moveToBinHandler.isPending}
                        onClick={onSubmit}
                    >
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteNote;
