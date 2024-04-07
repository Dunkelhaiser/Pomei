import { createLazyFileRoute } from "@tanstack/react-router";
import { useNotes } from "@/api/notes/hooks";
import Note from "@/components/Note";
import Loader from "@/ui/Loader";
import { Section, SectionContent, SectionHeader } from "@/ui/Section";

const Page = () => {
    const notes = useNotes({ page: 1, limit: 4, orderBy: "updatedAt", isAscending: "false" });

    return (
        <Section>
            <SectionHeader>Home</SectionHeader>
            <SectionContent>
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Latest Notes</h2>
                    <div
                        className={`
                            grid min-h-24 grid-cols-1 gap-4
                            md:grid-cols-2
                            xl:grid-cols-4
                        `}
                    >
                        {notes.isLoading ? (
                            <Loader className="col-span-full self-center justify-self-center" />
                        ) : (
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                            notes.data?.notes?.map((note) => (
                                <Note lineClamp="line-clamp-[6]" note={note} key={note.id} />
                            ))
                        )}
                    </div>
                </section>
            </SectionContent>
        </Section>
    );
};

export const Route = createLazyFileRoute("/")({
    component: Page,
});
