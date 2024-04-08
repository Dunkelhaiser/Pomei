import { Link } from "@tanstack/react-router";
import { EllipsisVertical } from "lucide-react";
import { Note as NoteType } from "shared-types/notes";
import { Card, CardContent, CardHeader } from "./ui/Card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu";
import { useArchiveNote } from "@/api/notes/hooks";
import { cn } from "@/utils/utils";

interface Props {
    note: NoteType;
    lineClamp?: string;
}

const Note = ({ note, lineClamp }: Props) => {
    const date = new Date(note.updatedAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    const archiveNote = useArchiveNote();

    return (
        <Card
            className={`
                group relative max-w-full translate-y-0 scroll-p-6 ring-accent-foreground ring-offset-background transition duration-300
                hover:translate-y-[-1.5px]
                focus-visible:translate-y-[-1.5px]
                group-focus-visible:translate-y-[-1.5px]
                has-[a:focus-visible]:translate-y-[-1.5px]
                has-[button:focus-visible]:translate-y-[-1.5px]
                has-[a:focus-visible]:ring-2
                has-[button:focus-visible]:ring-2
                has-[a:focus-visible]:ring-offset-0
                has-[button:focus-visible]:ring-offset-0
            `}
        >
            <CardHeader className="grid grid-cols-[1fr_18px] gap-2 pb-2 text-xl font-bold">
                <Link
                    to="/notes/$noteId"
                    params={{ noteId: note.id }}
                    className={`
                        line-clamp-1 outline-none
                        after:absolute after:inset-0 after:content-['']
                    `}
                >
                    {note.title}
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        type="button"
                        className={`
                            z-50 justify-self-end transition-all duration-300
                            lg:invisible lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100
                            lg:group-has-[a:focus-visible]:visible lg:group-has-[button:focus-visible]:visible
                            lg:group-has-[a:focus-visible]:opacity-100 lg:group-has-[button:focus-visible]:opacity-100
                            lg:aria-expanded:visible lg:aria-expanded:opacity-100
                        `}
                    >
                        <EllipsisVertical size={18} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Add To Folder</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                archiveNote.mutate({ input: { archive: !note.isArchived }, params: { id: note.id } })
                            }
                        >
                            {note.isArchived ? "Unarchive" : "Archive"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={`
                                text-destructive
                                focus-visible:text-destructive
                            `}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className={cn("text-sm text-muted-foreground dark:text-card-foreground/50", lineClamp)}>
                    {note.content}
                </p>
                <p className="text-xs text-muted-foreground/95">{date}</p>
            </CardContent>
        </Card>
    );
};

export default Note;
