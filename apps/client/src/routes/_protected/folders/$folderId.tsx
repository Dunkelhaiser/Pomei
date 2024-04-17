import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { useFolderInfo, useLoadFolderInfinity, useSearchFolderContent } from "@/api/folders/hooks";
import NotesSearch from "@/components/headers/NotesSearch";
import NotesLayout from "@/components/layouts/NotesLayout";
import { notesParamsSchema } from "@/types/routes";
import { Section, SectionContent, SectionHeader } from "@/ui/Section";

const Page = () => {
    const { sort, order, searchBy, search } = Route.useSearch();
    const { folderId } = Route.useParams();
    const folderInfo = useFolderInfo({ id: folderId });
    const folder = useLoadFolderInfinity({ id: folderId }, { page: 1, limit: 4, orderBy: sort, order });
    const searchFolder = useSearchFolderContent({ id: folderId }, { page: 1, limit: 4, title: search ?? "", searchBy });

    if (folderInfo.error) {
        return <SectionContent>Folder not found</SectionContent>;
    }

    return (
        <Section>
            <Helmet>
                <title>Pomei - {folderInfo.data?.name ?? "Not Found"}</title>
            </Helmet>
            <SectionHeader>{folderInfo.data?.name}</SectionHeader>
            <NotesSearch from="/_protected/folders/$folderId" />
            <NotesLayout notes={folder} searchNotes={searchFolder} search={search} emptyMessage="Folder is empty" />
        </Section>
    );
};

export const Route = createFileRoute("/_protected/folders/$folderId")({
    component: Page,
    validateSearch: (search) => notesParamsSchema.parse(search),
});
