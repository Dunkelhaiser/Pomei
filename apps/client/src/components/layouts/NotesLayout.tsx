/* eslint-disable no-nested-ternary */
import { InfiniteData, UseInfiniteQueryResult, UseQueryResult } from "@tanstack/react-query";
import { Fragment, forwardRef, useEffect } from "react";
import { Note as NoteType, NotesPaginated } from "shared-types/notes";
import Note from "@/components/Note";
import { useIntersection } from "@/hooks/useIntersection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Loader from "@/ui/Loader";
import { SectionContent } from "@/ui/Section";

interface NotesQuery {
    notes: UseInfiniteQueryResult<InfiniteData<NotesPaginated, unknown>, Error>;
}

interface Props extends NotesQuery {
    searchNotes: UseQueryResult<NoteType[], Error>;
    search?: string;
}

const DesktopLayout = forwardRef<HTMLDivElement, NotesQuery>(({ notes }, ref) => {
    return (
        <>
            <div className="grid gap-4">
                {notes.data?.pages.map((page) =>
                    page.notes.map(
                        (note, i) => i === 0 && <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                    )
                )}
            </div>
            <div className="grid gap-4">
                {notes.data?.pages.map((page) =>
                    page.notes.map(
                        (note, i) => i === 1 && <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                    )
                )}
            </div>
            <div className="grid gap-4">
                {notes.data?.pages.map((page) =>
                    page.notes.map(
                        (note, i) => i === 2 && <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                    )
                )}
            </div>
            <div className="grid gap-4">
                {notes.data?.pages.map((page) =>
                    page.notes.map(
                        (note, i) =>
                            i === 3 && (
                                <div key={note.id} ref={ref}>
                                    <Note lineClamp="line-clamp-[18]" note={note} />
                                </div>
                            )
                    )
                )}
            </div>
        </>
    );
});
DesktopLayout.displayName = "DesktopLayout";

const TabletLayout = forwardRef<HTMLDivElement, NotesQuery>(({ notes }, ref) => {
    return (
        <>
            <div className="grid gap-4">
                {notes.data?.pages.map((page) =>
                    page.notes.map(
                        (note, i) =>
                            (i === 0 || i === 2) && <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                    )
                )}
            </div>
            <div className="grid gap-4">
                {notes.data?.pages.map((page) =>
                    page.notes.map((note, i) => (
                        <Fragment key={note.id}>
                            {i === 1 && <Note lineClamp="line-clamp-[18]" note={note} />}
                            {i === 3 && (
                                <div ref={ref}>
                                    <Note lineClamp="line-clamp-[18]" note={note} />
                                </div>
                            )}
                        </Fragment>
                    ))
                )}
            </div>
        </>
    );
});
TabletLayout.displayName = "TabletLayout";

const MobileLayout = forwardRef<HTMLDivElement, NotesQuery>(({ notes }, ref) => {
    return (
        <div className="grid gap-4">
            {notes.data?.pages.map((page) =>
                page.notes.map((note, i) =>
                    i === 3 ? (
                        <div key={note.id} ref={ref}>
                            <Note lineClamp="line-clamp-[18]" note={note} />
                        </div>
                    ) : (
                        <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                    )
                )
            )}
        </div>
    );
});
MobileLayout.displayName = "MobileLayout";

const NotesLayout = ({ notes, searchNotes, search }: Props) => {
    const { isIntersecting, ref } = useIntersection({
        threshold: 0,
    });

    const mobile = useMediaQuery("(max-width: 767px)");
    const tablet = useMediaQuery("(min-width: 768px) and (max-width: 1279px)");
    const desktop = useMediaQuery("(min-width: 1280px)");

    useEffect(() => {
        if (isIntersecting && notes.hasNextPage) void notes.fetchNextPage();
    }, [isIntersecting, notes]);

    return (
        <SectionContent
            className={`
                grid min-h-24 grid-cols-1 items-start gap-4
                md:grid-cols-2
                xl:grid-cols-4
            `}
        >
            {search ? (
                searchNotes.isLoading ? (
                    <Loader className="col-span-full self-center justify-self-center" />
                ) : searchNotes.data && searchNotes.data.length > 0 ? (
                    searchNotes.data.map((note) => <Note lineClamp="line-clamp-[6]" note={note} key={note.id} />)
                ) : (
                    <p>No notes found</p>
                )
            ) : notes.isLoading ? (
                <Loader className="col-span-full self-center justify-self-center" />
            ) : (
                <>
                    {desktop && <DesktopLayout notes={notes} ref={ref} />}
                    {tablet && <TabletLayout notes={notes} ref={ref} />}
                    {mobile && <MobileLayout notes={notes} ref={ref} />}
                </>
            )}
        </SectionContent>
    );
};

export default NotesLayout;
