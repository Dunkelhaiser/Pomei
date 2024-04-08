import { createLazyFileRoute } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import { useEmptyBin, useGetBin } from "@/api/notes/hooks";
import Note from "@/components/Note";
import Button from "@/ui/Button";
import Loader from "@/ui/Loader";
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
import { Section, SectionContent, SectionHeader, SectionSubHeader } from "@/ui/Section";

const Page = () => {
    const bin = useGetBin();
    const emptyBinHandler = useEmptyBin();

    return (
        <Section>
            <AlertDialog>
                <SectionHeader>Bin</SectionHeader>
                <SectionSubHeader>
                    <AlertDialogTrigger>
                        <Button
                            variant="destructive"
                            size="sm"
                            disabled={!bin.data || bin.data.length < 1}
                            loading={emptyBinHandler.isPending}
                        >
                            <Trash size={16} />
                            Empty Bin
                        </Button>
                    </AlertDialogTrigger>
                </SectionSubHeader>
                <SectionContent
                    className={`
                        grid min-h-24 grid-cols-1 items-start gap-4
                        md:grid-cols-2
                        xl:grid-cols-4
                    `}
                >
                    {/*eslint-disable-next-line no-nested-ternary*/}
                    {bin.isLoading ? (
                        <Loader className="col-span-full self-center justify-self-center" />
                    ) : bin.data && bin.data.length > 0 ? (
                        bin.data.map((note) => <Note lineClamp="line-clamp-[6]" note={note} key={note.id} />)
                    ) : (
                        <p>Bin is empty</p>
                    )}
                </SectionContent>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Empty Bin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            All notes in the bin will be permanently deleted.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction variant="destructive" onClick={() => emptyBinHandler.mutate()}>
                            Empty
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Section>
    );
};

export const Route = createLazyFileRoute("/_protected/bin")({
    component: Page,
});
