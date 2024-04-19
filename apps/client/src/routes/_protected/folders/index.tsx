import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { useGetFoldersInfinity, useSearchFolders } from "@/api/folders/hooks";
import FoldersSearch from "@/components/headers/FoldersSearch";
import FoldersLayout from "@/components/layouts/FoldersLayout";
import { foldersParamsSchema } from "@/types/routes";
import { Section, SectionHeader } from "@/ui/Section";

const Page = () => {
    const { sort, order, search } = Route.useSearch();
    const folders = useGetFoldersInfinity({ page: 1, limit: 4, orderBy: sort, order });
    const searchFolders = useSearchFolders({ name: search ?? "" });

    return (
        <Section>
            <Helmet>
                <title>Pomei - Folders</title>
            </Helmet>
            <SectionHeader>Folders</SectionHeader>
            <FoldersSearch />
            <FoldersLayout folders={folders} searchFolders={searchFolders} search={search} />
        </Section>
    );
};

export const Route = createFileRoute("/_protected/folders/")({
    component: Page,
    validateSearch: (search) => foldersParamsSchema.parse(search),
});
