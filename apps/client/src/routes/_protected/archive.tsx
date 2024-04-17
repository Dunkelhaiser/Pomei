import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { useGetArchive, useSearchArchive } from "@/api/notes/hooks";
import NotesSearch from "@/components/headers/NotesSearch";
import NotesLayout from "@/components/layouts/NotesLayout";
import { notesParamsSchema } from "@/types/routes";
import { Section, SectionHeader } from "@/ui/Section";

const Page = () => {
    const { sort, order, searchBy, search } = Route.useSearch();
    const archive = useGetArchive({ page: 1, limit: 4, orderBy: sort, order });
    const searchArchive = useSearchArchive({ page: 1, limit: 4, title: search ?? "", searchBy });
    return (
        <Section>
            <Helmet>
                <title>Pomei - Archive</title>
            </Helmet>
            <SectionHeader>Archive</SectionHeader>
            <NotesSearch from="/_protected/archive" />
            <NotesLayout notes={archive} searchNotes={searchArchive} search={search} emptyMessage="Archive is empty" />
        </Section>
    );
};

export const Route = createFileRoute("/_protected/archive")({
    component: Page,
    validateSearch: (search) => notesParamsSchema.parse(search),
});
