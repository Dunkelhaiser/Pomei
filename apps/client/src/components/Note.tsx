import { Note as NoteType } from "shared-types/notes";
import Badge from "./ui/Badge";
import NoteMenu from "@/dropdowns/NoteMenu";
import { CardContent, CardHeader } from "@/ui/Card";
import { CardLink, CardLinkAnchor } from "@/ui/CardLink";
import { extractRichText } from "@/utils/extractRichText";
import { cn, formatDate } from "@/utils/utils";

interface Props {
    note: NoteType;
    lineClamp?: string;
    showTags?: boolean;
}

const Note = ({ note, lineClamp, showTags = true }: Props) => {
    const date = formatDate(note.updatedAt);

    return (
        <CardLink>
            <CardHeader className="flex flex-col space-y-0 pb-2">
                <div className="grid grid-cols-[1fr_18px] gap-2 text-xl font-bold">
                    <CardLinkAnchor to="/notes/$noteId" params={{ noteId: note.id }}>
                        {note.title}
                    </CardLinkAnchor>
                    <NoteMenu note={note} />
                </div>
                {showTags && note.tags && note.tags.length > 0 && (
                    <div className="h-[24.4px] space-x-1 overflow-hidden">
                        {note.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-[0.625rem]">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
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
