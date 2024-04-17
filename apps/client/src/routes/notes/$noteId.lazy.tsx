import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNote } from "@/api/notes/hooks";
import Editor from "@/components/Editor";
import Input from "@/ui/Input";
import Loader from "@/ui/Loader";
import TagsInput from "@/ui/TagsInput";

const Page = () => {
    const params = Route.useParams();
    const note = useNote({ id: params.noteId });
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([] as string[]);

    useEffect(() => {
        setTitle(note.data?.title ?? "");
        setContent(note.data?.content ?? "");
        setTags(note.data?.tags ?? []);
    }, [note.data?.content, note.data?.tags, note.data?.title]);

    const contentData = JSON.parse(note.data?.content?.length ? note.data.content : "[]") as {
        id: string;
        type: string;
        children: { text: string }[];
    }[];

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
                className="mb-4 bg-card px-4 py-6 text-2xl font-medium text-card-foreground"
                placeholder="Title"
                value={title}
                readOnly={note.data?.isDeleted}
            />
            <TagsInput className="mb-2 bg-card text-card-foreground" tags={tags} setTags={setTags} />
            <Editor
                initialValue={contentData}
                readOnly={note.data?.isDeleted}
                onChange={(val) => setContent(JSON.stringify(val))}
            />
        </div>
    );
};

export const Route = createLazyFileRoute("/notes/$noteId")({
    component: Page,
});
