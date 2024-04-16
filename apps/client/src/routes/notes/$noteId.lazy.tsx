import { createLazyFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { useNote } from "@/api/notes/hooks";
import Editor from "@/components/Editor";
import Input from "@/ui/Input";
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

    return (
        <div>
            <Helmet>
                <title>Pomei - {note.data?.title}</title>
            </Helmet>
            <Input
                className="mb-4 bg-card px-4 py-5 text-2xl text-card-foreground"
                placeholder="Title"
                value={note.data?.title ?? ""}
                readOnly={note.data?.isDeleted}
            />
            <Editor initialValue={note.data?.content ?? ""} readOnly={note.data?.isDeleted} />
        </div>
    );
};

export const Route = createLazyFileRoute("/notes/$noteId")({
    component: Page,
});
