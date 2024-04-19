import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useGetFoldersInfinity, useSearchFolders } from "@/api/folders/hooks";
import NewFolder from "@/components/dialogs/NewFolder";
import Folder from "@/components/Folder";
import FoldersSearch from "@/components/headers/FoldersSearch";
import { useIntersection } from "@/hooks/useIntersection";
import { foldersParamsSchema } from "@/types/routes";
import Loader from "@/ui/Loader";
import { Section, SectionContent, SectionHeader } from "@/ui/Section";

const Page = () => {
    const { sort, order, search } = Route.useSearch();
    const folders = useGetFoldersInfinity({ page: 1, limit: 4, orderBy: sort, order });
    const searchFolders = useSearchFolders({ name: search ?? "" });
    const { isIntersecting, ref } = useIntersection({
        threshold: 0,
    });

    useEffect(() => {
        if (isIntersecting && folders.hasNextPage) void folders.fetchNextPage();
    }, [isIntersecting, folders]);

    return (
        <Section>
            <Helmet>
                <title>Pomei - Folders</title>
            </Helmet>
            <SectionHeader>Folders</SectionHeader>
            <FoldersSearch />
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
        </Section>
    );
};

export const Route = createFileRoute("/_protected/folders/")({
    component: Page,
    validateSearch: (search) => foldersParamsSchema.parse(search),
});
