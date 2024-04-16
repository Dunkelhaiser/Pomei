import { Note as NoteType } from "shared-types/notes";
import NoteMenu from "@/dropdowns/NoteMenu";
import { CardContent, CardHeader } from "@/ui/Card";
import { CardLink, CardLinkAnchor } from "@/ui/CardLink";
import { extractRichText } from "@/utils/extractRichText";
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

    return (
        <CardLink>
            <CardHeader className="grid grid-cols-[1fr_18px] gap-2 pb-2 text-xl font-bold">
                <CardLinkAnchor to="/notes/$noteId" params={{ noteId: note.id }}>
                    {note.title}
                </CardLinkAnchor>
                <NoteMenu note={note} />
            </CardHeader>
            <CardContent className="flex grow flex-col justify-between gap-3">
                <p className={cn("text-sm text-muted-foreground dark:text-card-foreground/50", lineClamp)}>
                    {extractRichText(note.content)}
                </p>
                <p className="text-xs text-muted-foreground/95">{date}</p>
            </CardContent>
        </CardLink>
    );
};

export default Note;
