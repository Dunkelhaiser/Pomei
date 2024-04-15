import { createFileRoute } from "@tanstack/react-router";
import { useLoadFolderInfinity, useSearchFolderContent } from "@/api/folders/hooks";
import NotesSearch from "@/components/headers/NotesSearch";
import NotesLayout from "@/components/layouts/NotesLayout";
import { notesParamsSchema } from "@/types/routes";
import { Section, SectionHeader } from "@/ui/Section";

const Page = () => {
    const { sort, order, searchBy, search } = Route.useSearch();
    const { folderId } = Route.useParams();
    const folder = useLoadFolderInfinity({ id: folderId }, { page: 1, limit: 4, orderBy: sort, order });
    const searchFolder = useSearchFolderContent({ id: folderId }, { page: 1, limit: 4, title: search ?? "", searchBy });
    return (
        <Section>
            <SectionHeader>Specific Folder</SectionHeader>
            <NotesSearch from="/_protected/folders/$folderId" />
            <NotesLayout notes={folder} searchNotes={searchFolder} search={search} />
        </Section>
    );
};

export const Route = createFileRoute("/_protected/folders/$folderId")({
    component: Page,
    validateSearch: (search) => notesParamsSchema.parse(search),
});