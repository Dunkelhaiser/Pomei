import { InfiniteData, UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { Folder as FolderType, FoldersPaginated } from "shared-types/folders";
import Folder from "@/components/Folder";
import NewFolder from "@/dialogs/NewFolder";
import { useIntersection } from "@/hooks/useIntersection";
import Loader from "@/ui/Loader";
import { SectionContent } from "@/ui/Section";

type InfiniteFolder = UseInfiniteQueryResult<InfiniteData<FoldersPaginated, unknown>, Error>;

interface FoldersQuery {
    folders: InfiniteFolder;
}

interface Props extends FoldersQuery {
    searchFolders: UseQueryResult<FolderType[]>;
    search?: string;
}

const FoldersLayout = ({ folders, searchFolders, search }: Props) => {
    const { isIntersecting, ref } = useIntersection({
        threshold: 0,
    });

    useEffect(() => {
        if (isIntersecting && folders.hasNextPage) void folders.fetchNextPage();
    }, [isIntersecting, folders]);
    return (
        <SectionContent
            className={`
                grid min-h-24 grid-cols-1 items-start gap-4
                md:grid-cols-2
                xl:grid-cols-4
            `}
        >
            <NewFolder />
            {/* eslint-disable no-nested-ternary */}
            {search ? (
                searchFolders.isLoading ? (
                    <Loader className="col-span-full self-center justify-self-center" />
                ) : searchFolders.data && searchFolders.data.length > 0 ? (
                    searchFolders.data.map((folder) => <Folder folder={folder} key={folder.id} />)
                ) : (
                    <p className="text-muted-foreground">No folders found.</p>
                )
            ) : folders.isLoading ? (
                <Loader className="col-span-full self-center justify-self-center" />
            ) : folders.data?.pages[0].totalCount === 0 ? (
                <p className="text-muted-foreground">You don&apos;t have any folders.</p>
            ) : (
                folders.data?.pages.map((page) =>
                    page.folders.map((folder, i) =>
                        i === 3 ? (
                            <div key={folder.id} ref={ref}>
                                <Folder folder={folder} />
                            </div>
                        ) : (
                            <Folder folder={folder} key={folder.id} />
                        )
                    )
                )
            )}
        </SectionContent>
    );
};

export default FoldersLayout;
