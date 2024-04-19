import LocalNoteMenu from "./dropdowns/LocalNoteMenu";
import { LocalNote as LocalNoteType } from "@/store/Notes";
import { CardContent, CardHeader } from "@/ui/Card";
import { CardLink, CardLinkAnchor } from "@/ui/CardLink";
import { extractRichText } from "@/utils/extractRichText";
import { cn, formatDate } from "@/utils/utils";

interface Props {
    note: LocalNoteType;
    lineClamp?: string;
}

const LocalNote = ({ note, lineClamp }: Props) => {
    const date = formatDate(new Date(note.updatedAt));

    return (
        <CardLink>
            <CardHeader className="flex flex-col space-y-0 pb-2">
                <div className="grid grid-cols-[1fr_18px] gap-2 text-xl font-bold">
                    <CardLinkAnchor to="/notes/$noteId" params={{ noteId: note.id }}>
                        {note.title}
                    </CardLinkAnchor>
                    <LocalNoteMenu note={note} />
                </div>
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

export default LocalNote;
