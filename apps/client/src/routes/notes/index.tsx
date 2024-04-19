import { Link, createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { Plus } from "lucide-react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNotesInfinity, useSearchNotes } from "@/api/notes/hooks";
import NotesSearch from "@/components/headers/NotesSearch";
import LocalNotesLayout from "@/components/layouts/LocalNotesLayout";
import NotesLayout from "@/components/layouts/NotesLayout";
import { UserContext } from "@/context/User";
import { notesAtom, notesOrderAtom, notesSearchAtom } from "@/store/Notes";
import { notesParamsSchema } from "@/types/routes";
import Button from "@/ui/Button";
import { Section, SectionHeader } from "@/ui/Section";

const Page = () => {
    const { isAuthorized } = useContext(UserContext);
    const { sort, order, searchBy, search } = Route.useSearch();
    const notes = useNotesInfinity({ page: 1, limit: 4, orderBy: sort, order });
    const searchNotes = useSearchNotes({ page: 1, limit: 4, title: search ?? "", searchBy });
    useAtomValue(notesAtom);
    const localNotesHandler = useAtomValue(notesOrderAtom);
    const searchLocalNotesHandler = useAtomValue(notesSearchAtom);
    const searchLocalNotes = searchLocalNotesHandler(search ?? "", searchBy === "tags" ? "title" : searchBy);
    const localNotes = localNotesHandler(sort, order);

    return (
        <Section>
            <Helmet>
                <title>Pomei - Notes</title>
            </Helmet>
            <SectionHeader>Notes</SectionHeader>
            <NotesSearch from="/notes/" />
            <Button aria-label="Create Note" size="floating" asChild>
                <Link to="/notes/create">
                    <Plus />
                </Link>
            </Button>
            {isAuthorized ? (
                <NotesLayout
                    notes={notes}
                    searchNotes={searchNotes}
                    search={search}
                    emptyMessage="You don't have any notes"
                />
            ) : (
                <LocalNotesLayout notes={localNotes} search={search} searchNotes={searchLocalNotes} />
            )}
        </Section>
    );
};

export const Route = createFileRoute("/notes/")({
    component: Page,
    validateSearch: (search) => notesParamsSchema.parse(search),
});
