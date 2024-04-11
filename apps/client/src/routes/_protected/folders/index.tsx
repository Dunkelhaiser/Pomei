import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { z as zod } from "zod";
import { useGetFoldersInfinity, useSearchFolders } from "@/api/folders/hooks";
import NewFolder from "@/components/dialogs/NewFolder";
import Folder from "@/components/Folder";
import FoldersSearch from "@/components/headers/FoldersSearch";
import { useIntersection } from "@/hooks/useIntersection";
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
                        <p>No folders found.</p>
                    )
                ) : folders.isLoading ? (
                    <Loader className="col-span-full self-center justify-self-center" />
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

const routeParamsSchema = zod.object({
    sort: zod.enum(["name", "createdAt", "updatedAt"]).catch("name"),
    order: zod.enum(["ascending", "descending"]).catch("ascending"),
    search: zod.string().optional(),
});

export const Route = createFileRoute("/_protected/folders/")({
    component: Page,
    validateSearch: (search) => routeParamsSchema.parse(search),
});
