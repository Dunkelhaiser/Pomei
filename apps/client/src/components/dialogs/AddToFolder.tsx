/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react";
import { FolderBtn } from "../FolderBtn";
import { useGetFoldersInfinity, useSearchFolders } from "@/api/folders/hooks";
import { useIntersection } from "@/hooks/useIntersection";
import Input from "@/ui/Input";
import Loader from "@/ui/Loader";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/ui/Modal";
import { ScrollArea } from "@/ui/ScrollArea";

interface Props {
    id: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AddToFolder = ({ id, open, setOpen }: Props) => {
    const [search, setSearch] = useState("");
    const folders = useGetFoldersInfinity({ page: 1, limit: 8, orderBy: "name", order: "ascending" });
    const searchFolders = useSearchFolders({ name: search });

    const onSubmit = async () => {
        setOpen(false);
    };

    const { isIntersecting, ref } = useIntersection({
        threshold: 0,
    });

    useEffect(() => {
        if (isIntersecting && folders.hasNextPage) void folders.fetchNextPage();
    }, [isIntersecting, folders]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add To Folder</AlertDialogTitle>
                    <AlertDialogDescription>Select folder for note to be added in.</AlertDialogDescription>
                    <Input
                        placeholder="Search..."
                        className="bg-card"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </AlertDialogHeader>
                <ScrollArea className="max-h-[50vh]">
                    <div className="min-h-8 space-y-2">
                        {search ? (
                            searchFolders.isLoading ? (
                                <Loader className="col-span-full self-center justify-self-center" />
                            ) : searchFolders.data && searchFolders.data.length > 0 ? (
                                searchFolders.data.map((folder) => (
                                    <FolderBtn folder={folder} noteId={id} key={folder.id} close={onSubmit} />
                                ))
                            ) : (
                                <p>No folders found.</p>
                            )
                        ) : folders.isLoading ? (
                            <Loader className="col-span-full self-center justify-self-center" />
                        ) : (
                            folders.data?.pages.map((page) =>
                                page.folders.map((folder, i) =>
                                    i === 3 ? (
                                        <div key={folder.id} ref={ref}>
                                            <FolderBtn folder={folder} noteId={id} close={onSubmit} />
                                        </div>
                                    ) : (
                                        <FolderBtn folder={folder} noteId={id} key={folder.id} close={onSubmit} />
                                    )
                                )
                            )
                        )}
                    </div>
                </ScrollArea>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AddToFolder;
