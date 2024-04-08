import { createLazyFileRoute } from "@tanstack/react-router";
import { useGetArchive } from "@/api/notes/hooks";
import Note from "@/components/Note";
import Loader from "@/ui/Loader";
import { Section, SectionContent, SectionHeader } from "@/ui/Section";

const Page = () => {
    const archive = useGetArchive();

    return (
        <Section>
            <SectionHeader>Archive</SectionHeader>
            <SectionContent
                className={`
                    grid min-h-24 grid-cols-1 items-start gap-4
                    md:grid-cols-2
                    xl:grid-cols-4
                `}
            >
                {/*eslint-disable-next-line no-nested-ternary*/}
                {archive.isLoading ? (
                    <Loader className="col-span-full self-center justify-self-center" />
                ) : archive.data && archive.data.length > 0 ? (
                    archive.data.map((note) => <Note lineClamp="line-clamp-[6]" note={note} key={note.id} />)
                ) : (
                    <p>Archive is empty</p>
                )}
            </SectionContent>
        </Section>
    );
};

export const Route = createLazyFileRoute("/_protected/archive")({
    component: Page,
});
