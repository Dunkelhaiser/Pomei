import { Trash } from "lucide-react";
import { useEmptyBin, useGetBin } from "@/api/notes/hooks";
import Button from "@/ui/Button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/ui/Modal";

const EmptyBin = () => {
    const emptyBinHandler = useEmptyBin();
    const bin = useGetBin({ page: 1, limit: 1 });

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    size="sm"
                    disabled={!bin.data || bin.data.pages[0].notes.length < 1}
                    loading={emptyBinHandler.isPending}
                >
                    <Trash size={16} />
                    Empty Bin
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Empty Bin?</AlertDialogTitle>
                    <AlertDialogDescription>All notes in the bin will be permanently deleted.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={() => emptyBinHandler.mutate()}>
                        Empty
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default EmptyBin;
