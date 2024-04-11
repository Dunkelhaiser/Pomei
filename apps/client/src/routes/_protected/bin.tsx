/* eslint-disable no-nested-ternary */
import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect } from "react";
import { useGetBin, useSearchBin } from "@/api/notes/hooks";
import NotesSearch from "@/components/headers/NotesSearch";
import Note from "@/components/Note";
import EmptyBin from "@/dialogs/EmptyBin";
import { useIntersection } from "@/hooks/useIntersection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { notesParamsSchema } from "@/types/routes";
import Loader from "@/ui/Loader";
import { Section, SectionContent, SectionHeader, SectionSubHeader } from "@/ui/Section";

const Page = () => {
    const { sort, order, searchBy, search } = Route.useSearch();
    const bin = useGetBin({ page: 1, limit: 4, orderBy: sort, order });
    const searchBin = useSearchBin({ title: search ?? "", searchBy });

    const { isIntersecting, ref } = useIntersection({
        threshold: 0,
    });
    const mobile = useMediaQuery("(max-width: 767px)");
    const tablet = useMediaQuery("(min-width: 768px) and (max-width: 1279px)");
    const desktop = useMediaQuery("(min-width: 1280px)");

    useEffect(() => {
        if (isIntersecting && bin.hasNextPage) void bin.fetchNextPage();
    }, [isIntersecting, bin]);

    return (
        <Section>
            <SectionHeader>Bin</SectionHeader>
            <NotesSearch from="/_protected/bin" />
            <SectionSubHeader>
                <EmptyBin />
            </SectionSubHeader>
            <SectionContent
                className={`
                    grid min-h-24 grid-cols-1 items-start gap-4
                    md:grid-cols-2
                    xl:grid-cols-4
                `}
            >
                {search ? (
                    searchBin.isLoading ? (
                        <Loader className="col-span-full self-center justify-self-center" />
                    ) : searchBin.data && searchBin.data.length > 0 ? (
                        searchBin.data.map((note) => <Note lineClamp="line-clamp-[6]" note={note} key={note.id} />)
                    ) : (
                        <p>No notes found</p>
                    )
                ) : bin.isLoading ? (
                    <Loader className="col-span-full self-center justify-self-center" />
                ) : (
                    <>
                        {desktop && (
                            <>
                                <div className="grid gap-4">
                                    {bin.data?.pages.map((page) =>
                                        page.notes.map(
                                            (note, i) =>
                                                i === 0 && (
                                                    <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                                                )
                                        )
                                    )}
                                </div>
                                <div className="grid gap-4">
                                    {bin.data?.pages.map((page) =>
                                        page.notes.map(
                                            (note, i) =>
                                                i === 1 && (
                                                    <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                                                )
                                        )
                                    )}
                                </div>
                                <div className="grid gap-4">
                                    {bin.data?.pages.map((page) =>
                                        page.notes.map(
                                            (note, i) =>
                                                i === 2 && (
                                                    <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                                                )
                                        )
                                    )}
                                </div>
                                <div className="grid gap-4">
                                    {bin.data?.pages.map((page) =>
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
                        )}
                        {tablet && (
                            <>
                                <div className="grid gap-4">
                                    {bin.data?.pages.map((page) =>
                                        page.notes.map(
                                            (note, i) =>
                                                (i === 0 || i === 2) && (
                                                    <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                                                )
                                        )
                                    )}
                                </div>
                                <div className="grid gap-4">
                                    {bin.data?.pages.map((page) =>
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
                        )}
                        {mobile && (
                            <div className="grid gap-4">
                                {bin.data?.pages.map((page) =>
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
                        )}
                    </>
                )}
            </SectionContent>
        </Section>
    );
};

export const Route = createFileRoute("/_protected/bin")({
    component: Page,
    validateSearch: (search) => notesParamsSchema.parse(search),
});
