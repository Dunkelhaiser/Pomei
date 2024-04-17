import { createLazyFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useFolders } from "@/api/folders/hooks";
import { useNotes } from "@/api/notes/hooks";
import Folder from "@/components/Folder";
import Note from "@/components/Note";
import { UserContext } from "@/context/User";
import Loader from "@/ui/Loader";
import { Section, SectionContent, SectionHeader } from "@/ui/Section";

const Page = () => {
    const { user } = useContext(UserContext);
    const notes = useNotes({ page: 1, limit: 4, orderBy: "updatedAt", order: "descending" });
    const folders = useFolders({ page: 1, limit: 4, orderBy: "updatedAt", order: "descending" });

    return (
        <Section>
            <Helmet>
                <title>Pomei - Home</title>
            </Helmet>
            <SectionHeader>Home</SectionHeader>
            <SectionContent className="space-y-8">
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
                                <Note lineClamp="line-clamp-[6]" note={note} key={note.id} showTags={false} />
                            ))
                        )}
                    </div>
                </section>
                {user?.id && (
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold">Latest Folders</h2>
                        <div
                            className={`
                                grid min-h-24 grid-cols-1 gap-4
                                md:grid-cols-2
                                xl:grid-cols-4
                            `}
                        >
                            {folders.isLoading ? (
                                <Loader className="col-span-full self-center justify-self-center" />
                            ) : (
                                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                                folders.data?.folders?.map((folder) => <Folder folder={folder} key={folder.id} />)
                            )}
                        </div>
                    </section>
                )}
            </SectionContent>
        </Section>
    );
};

export const Route = createLazyFileRoute("/")({
    component: Page,
});
