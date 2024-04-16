import { Link, createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useNotesInfinity, useSearchNotes } from "@/api/notes/hooks";
import NotesSearch from "@/components/headers/NotesSearch";
import NotesLayout from "@/components/layouts/NotesLayout";
import { notesParamsSchema } from "@/types/routes";
import Button from "@/ui/Button";
import { Section, SectionHeader } from "@/ui/Section";

const Page = () => {
    const { sort, order, searchBy, search } = Route.useSearch();
    const notes = useNotesInfinity({ page: 1, limit: 4, orderBy: sort, order });
    const searchNotes = useSearchNotes({ page: 1, limit: 4, title: search ?? "", searchBy });

    return (
        <Section>
            <SectionHeader>Notes</SectionHeader>
            <NotesSearch from="/notes/" />
            <Button aria-label="Create Note" size="floating" asChild>
                <Link to="/notes/create">
                    <Plus />
                </Link>
            </Button>
            <NotesLayout notes={notes} searchNotes={searchNotes} search={search} />
        </Section>
    );
};

export const Route = createFileRoute("/notes/")({
    component: Page,
    validateSearch: (search) => notesParamsSchema.parse(search),
});
