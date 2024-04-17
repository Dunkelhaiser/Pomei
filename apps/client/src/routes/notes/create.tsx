import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useCreateNote } from "@/api/notes/hooks";
import Editor from "@/components/Editor";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import TagsInput from "@/ui/TagsInput";

const Page = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([] as string[]);

    const createNoteHandler = useCreateNote();

    const createNote = async () => {
        await createNoteHandler.mutateAsync({ title, content, tags });
    };

    return (
        <div>
            <Helmet>
                <title>Pomei - New Note</title>
            </Helmet>
            <Input
                className="mb-4 bg-card px-4 py-6 text-2xl font-medium text-card-foreground"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TagsInput className="mb-2 bg-card text-card-foreground" tags={tags} setTags={setTags} />
            <Editor onChange={(val) => setContent(JSON.stringify(val))} />
            <Button className="mt-4" type="button" onClick={createNote} loading={createNoteHandler.isPending}>
                Create
            </Button>
        </div>
    );
};

export const Route = createFileRoute("/notes/create")({
    component: Page,
});
