import { useState } from "react";
import { Folder } from "shared-types/folders";
import { useDeleteFolder, useDeleteFolderWithNotes } from "@/api/folders/hooks";
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
    folder: Folder;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const DeleteFolder = ({ folder, open, setOpen }: Props) => {
    const [deleteWithNotes, setDeleteWithNotes] = useState<"indeterminate" | boolean>(false);
    const deleteFolderHandler = useDeleteFolder();
    const deleteFolderWithNotesHandler = useDeleteFolderWithNotes();

    const onSubmit = async () => {
        if (deleteWithNotes) {
            await deleteFolderWithNotesHandler.mutateAsync({ id: folder.id });
        } else {
            await deleteFolderHandler.mutateAsync({ id: folder.id });
        }
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Folder?</AlertDialogTitle>
                    <AlertDialogDescription>Only folder will be deleted.</AlertDialogDescription>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="with_notes"
                            checked={deleteWithNotes}
                            onCheckedChange={(value) => setDeleteWithNotes(value)}
                        />
                        <Label htmlFor="with_notes">Delete with notes</Label>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        type="button"
                        variant="destructive"
                        loading={deleteFolderHandler.isPending}
                        onClick={onSubmit}
                    >
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteFolder;
