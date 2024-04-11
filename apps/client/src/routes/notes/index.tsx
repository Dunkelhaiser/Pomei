import { createFileRoute } from "@tanstack/react-router";
import { useNotesInfinity, useSearchNotes } from "@/api/notes/hooks";
import NotesSearch from "@/components/headers/NotesSearch";
import NotesLayout from "@/components/layouts/NotesLayout";
import { notesParamsSchema } from "@/types/routes";
import { Section, SectionHeader } from "@/ui/Section";

const Page = () => {
    const { sort, order, searchBy, search } = Route.useSearch();
    const notes = useNotesInfinity({ page: 1, limit: 4, orderBy: sort, order });
    const searchNotes = useSearchNotes({ title: search ?? "", searchBy });

    return (
        <Section>
            <SectionHeader>Notes</SectionHeader>
            <NotesSearch from="/notes/" />
            <NotesLayout notes={notes} searchNotes={searchNotes} search={search} />
        </Section>
    );
};

export const Route = createFileRoute("/notes/")({
    component: Page,
    validateSearch: (search) => notesParamsSchema.parse(search),
});
