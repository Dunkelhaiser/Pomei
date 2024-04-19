import LocalNote from "../NoteLocal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LocalNote as LocalNoteType } from "@/store/Notes";
import { SectionContent } from "@/ui/Section";

interface Notes {
    notes: LocalNoteType[];
}

interface Props extends Notes {
    searchNotes: LocalNoteType[];
    search?: string;
}

const DesktopLayout = ({ notes }: Notes) => {
    return (
        <>
            <div className="grid gap-4">
                {notes.map(
                    (note, i) => i % 4 === 0 && <LocalNote lineClamp="line-clamp-[18]" note={note} key={note.id} />
                )}
            </div>
            <div className="grid gap-4">
                {notes.map(
                    (note, i) => i % 4 === 1 && <LocalNote lineClamp="line-clamp-[18]" note={note} key={note.id} />
                )}
            </div>
            <div className="grid gap-4">
                {notes.map(
                    (note, i) => i % 4 === 2 && <LocalNote lineClamp="line-clamp-[18]" note={note} key={note.id} />
                )}
            </div>
            <div className="grid gap-4">
                {notes.map(
                    (note, i) => i % 4 === 3 && <LocalNote lineClamp="line-clamp-[18]" note={note} key={note.id} />
                )}
            </div>
        </>
    );
};

const TabletLayout = ({ notes }: Notes) => {
    return (
        <>
            <div className="grid gap-4">
                {notes.map(
                    (note, i) => i % 2 === 0 && <LocalNote lineClamp="line-clamp-[18]" note={note} key={note.id} />
                )}
            </div>
            <div className="grid gap-4">
                {notes.map(
                    (note, i) => i % 2 !== 0 && <LocalNote lineClamp="line-clamp-[18]" note={note} key={note.id} />
                )}
            </div>
        </>
    );
};

const MobileLayout = ({ notes }: Notes) => {
    return (
        <div className="grid gap-4">
            {notes.map((note) => (
                <LocalNote lineClamp="line-clamp-[18]" note={note} key={note.id} />
            ))}
        </div>
    );
};

const LocalNotesLayout = ({ notes, searchNotes, search }: Props) => {
    const mobile = useMediaQuery("(max-width: 767px)");
    const tablet = useMediaQuery("(min-width: 768px) and (max-width: 1279px)");
    const desktop = useMediaQuery("(min-width: 1280px)");

    return (
        <SectionContent
            className={`
                grid min-h-24 grid-cols-1 items-start gap-4
                md:grid-cols-2
                xl:grid-cols-4
            `}
        >
            {/* eslint-disable-next-line no-nested-ternary*/}
            {search ? (
                searchNotes.length > 0 ? (
                    <>
                        {desktop && <DesktopLayout notes={searchNotes} />}
                        {tablet && <TabletLayout notes={searchNotes} />}
                        {mobile && <MobileLayout notes={searchNotes} />}
                    </>
                ) : (
                    <p className="text-muted-foreground">No notes found</p>
                )
            ) : notes.length === 0 ? (
                <p className="text-muted-foreground">You don&apos;t have any notes</p>
            ) : (
                <>
                    {desktop && <DesktopLayout notes={notes} />}
                    {tablet && <TabletLayout notes={notes} />}
                    {mobile && <MobileLayout notes={notes} />}
                </>
            )}
        </SectionContent>
    );
};

export default LocalNotesLayout;
