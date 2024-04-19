import { createLazyFileRoute } from "@tanstack/react-router";
import { useAtomValue, useSetAtom } from "jotai";
import { BadgePlus, PencilLine } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useEditNote, useNote } from "@/api/notes/hooks";
import Editor from "@/components/Editor";
import { UserContext } from "@/context/User";
import { noteByIdAtom, notesAtom } from "@/store/Notes";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Loader from "@/ui/Loader";
import TagsInput from "@/ui/TagsInput";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/Tooltip";
import { formatDate } from "@/utils/utils";

const Note = () => {
    const params = Route.useParams();
    const note = useNote({ id: params.noteId });
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([] as string[]);

    const editNote = useEditNote({ id: params.noteId });

    const editNoteHandler = async () => {
        await editNote.mutateAsync({ title, content, tags });
    };

    useEffect(() => {
        setTitle(note.data?.title ?? "");
        setContent(note.data?.content ?? "");
        setTags(note.data?.tags ?? []);
    }, [note.data?.content, note.data?.tags, note.data?.title]);

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

    if (note.data) {
        const dateUpdated = formatDate(note.data.updatedAt);
        const dateCreated = formatDate(note.data.createdAt);

        const contentData = JSON.parse(note.data.content?.length ? note.data.content : "[]") as {
            id: string;
            type: string;
            children: { text: string }[];
        }[];

        return (
            <div>
                <Helmet>
                    <title>Pomei - {note.data.title}</title>
                </Helmet>
                <Input
                    className="mb-1 bg-card px-4 py-6 text-2xl font-medium text-card-foreground"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    readOnly={note.data.isDeleted}
                />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="ml-4 cursor-default">
                            <p className="flex items-center gap-1 text-sm text-muted-foreground">
                                <PencilLine size={14} /> {dateUpdated}
                            </p>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p className="flex items-center gap-1 text-sm text-muted-foreground">
                                <BadgePlus size={14} /> {dateCreated}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TagsInput className="mb-2 mt-4 bg-card text-card-foreground" tags={tags} setTags={setTags} />
                <Editor
                    initialValue={contentData}
                    readOnly={note.data.isDeleted}
                    onChange={(val) => setContent(JSON.stringify(val))}
                />
                <Button className="mt-4" type="button" onClick={editNoteHandler} loading={editNote.isPending}>
                    Save
                </Button>
            </div>
        );
    }

    return <div>Note does not exist</div>;
};

const LocalNote = () => {
    const params = Route.useParams();
    const getNoteById = useAtomValue(noteByIdAtom);
    const setNote = useSetAtom(notesAtom);
    const note = getNoteById(params.noteId);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        setTitle(note?.title ?? "");
        setContent(note?.content ?? "");
    }, [note?.content, note?.title]);

    if (!note) {
        return <div>Note does not exist</div>;
    }

    const contentData = JSON.parse(note.content.length ? note.content : "[]") as {
        id: string;
        type: string;
        children: { text: string }[];
    }[];

    const editNote = () => {
        setNote((prev) =>
            prev.map((n) => {
                if (n.id === note.id) {
                    return {
                        ...n,
                        title,
                        content,
                        updatedAt: new Date().toISOString(),
                    };
                }
                return n;
            })
        );
        toast.success("Note edited successfully");
    };

    return (
        <div>
            <Helmet>
                <title>Pomei - {note.title}</title>
            </Helmet>
            <Input
                className="mb-4 bg-card px-4 py-6 text-2xl font-medium text-card-foreground"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Editor onChange={(val) => setContent(JSON.stringify(val))} initialValue={contentData} />
            <Button className="mt-4" type="button" onClick={editNote}>
                Save
            </Button>
        </div>
    );
};

const Page = () => {
    const { isAuthorized } = useContext(UserContext);

    return isAuthorized ? <Note /> : <LocalNote />;
};

export const Route = createLazyFileRoute("/notes/$noteId")({
    component: Page,
});
