import { createLazyFileRoute } from "@tanstack/react-router";
import { useNote } from "@/api/notes/hooks";
import Loader from "@/ui/Loader";

const Page = () => {
    const params = Route.useParams();
    const note = useNote({ id: params.noteId });

    if (note.isLoading) {
        return (
            <div className="absolute left-1/2 top-1/2 translate-x-1/2 translate-y-1/2">
                <Loader />
            </div>
        );
    }

    if (note.error) {
        return <div>Note does not exist</div>;
    }

    return <div>Hello {JSON.stringify(note.data)}!</div>;
};

export const Route = createLazyFileRoute("/notes/$noteId")({
    component: Page,
});
