import { createLazyFileRoute } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useCreateNote } from "@/api/notes/hooks";
import Editor from "@/components/Editor";
import { UserContext } from "@/context/User";
import { notesAtom } from "@/store/Notes";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import TagsInput from "@/ui/TagsInput";
import { generateId } from "@/utils/utils";

const CreateLocal = () => {
    const navigate = Route.useNavigate();
    const setNote = useSetAtom(notesAtom);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const createNote = async () => {
        const id = generateId();
        setNote((prev) => [
            ...prev,
            {
                id,
                title,
                content,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ]);
        toast.success("Note created successfully");
        await navigate({ to: "/notes/$noteId", params: { noteId: id } });
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
            <Editor onChange={(val) => setContent(JSON.stringify(val))} />
            <Button className="mt-4" type="button" onClick={createNote}>
                Create
            </Button>
        </div>
    );
};

const Create = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([] as string[]);

    const createNote = useCreateNote();

    const createNoteHandler = async () => {
        await createNote.mutateAsync({ title, content, tags });
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
            <Button className="mt-4" type="button" onClick={createNoteHandler} loading={createNote.isPending}>
                Create
            </Button>
        </div>
    );
};

const Page = () => {
    const { isAuthorized } = useContext(UserContext);

    return isAuthorized ? <Create /> : <CreateLocal />;
};

export const Route = createLazyFileRoute("/notes/create")({
    component: Page,
});
