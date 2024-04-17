import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { useGetBin, useSearchBin } from "@/api/notes/hooks";
import NotesSearch from "@/components/headers/NotesSearch";
import NotesLayout from "@/components/layouts/NotesLayout";
import EmptyBin from "@/dialogs/EmptyBin";
import { notesParamsSchema } from "@/types/routes";
import { Section, SectionHeader, SectionSubHeader } from "@/ui/Section";

const Page = () => {
    const { sort, order, searchBy, search } = Route.useSearch();
    const bin = useGetBin({ page: 1, limit: 4, orderBy: sort, order });
    const searchBin = useSearchBin({ page: 1, limit: 4, title: search ?? "", searchBy });

    return (
        <Section>
            <Helmet>
                <title>Pomei - Bin</title>
            </Helmet>
            <SectionHeader>Bin</SectionHeader>
            <NotesSearch from="/_protected/bin" />
            <SectionSubHeader>
                <EmptyBin />
            </SectionSubHeader>
            <NotesLayout notes={bin} searchNotes={searchBin} search={search} emptyMessage="Bin is empty" />
        </Section>
    );
};

export const Route = createFileRoute("/_protected/bin")({
    component: Page,
    validateSearch: (search) => notesParamsSchema.parse(search),
});
