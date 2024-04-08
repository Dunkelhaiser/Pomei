/* eslint-disable no-nested-ternary */
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownNarrowWide, ListFilter, Search } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { z as zod } from "zod";
import { useNotesInfinity, useSearchNotes } from "@/api/notes/hooks";
import Note from "@/components/Note";
import { useIntersection } from "@/hooks/useIntersection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Button from "@/ui/Button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import Input from "@/ui/Input";
import Loader from "@/ui/Loader";
import { Section, SectionContent, SectionHeader, SectionSubHeader } from "@/ui/Section";

const Page = () => {
    const [search, setSearch] = useState("");
    const { sort, order, searchBy } = Route.useSearch();
    const navigate = Route.useNavigate();
    const notes = useNotesInfinity({ page: 1, limit: 4, orderBy: sort, order });
    const searchNotes = useSearchNotes({ title: search, searchBy });
    const { isIntersecting, ref } = useIntersection({
        threshold: 0,
    });

    const mobile = useMediaQuery("(max-width: 767px)");
    const tablet = useMediaQuery("(min-width: 768px) and (max-width: 1279px)");
    const desktop = useMediaQuery("(min-width: 1280px)");

    useEffect(() => {
        if (isIntersecting && notes.hasNextPage) void notes.fetchNextPage();
    }, [isIntersecting, notes]);

    const handleSort = (sortValue: "title" | "createdAt" | "updatedAt") => {
        void navigate({ to: "/notes", search: { sort: sortValue, order, searchBy } });
    };

    const handleOrder = (orderValue: "ascending" | "descending") => {
        void navigate({ to: "/notes", search: { sort, order: orderValue, searchBy } });
    };

    const handleSearchBy = (searchByValue: "title" | "tags" | "content") => {
        void navigate({ to: "/notes", search: { sort, order, searchBy: searchByValue } });
    };

    return (
        <Section>
            <SectionHeader>Notes</SectionHeader>
            <SectionSubHeader className="flex gap-4">
                <Input
                    placeholder="Search..."
                    className="bg-card"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="gap-1">
                            <Search className="size-3.5" />
                            <span
                                className={`
                                    sr-only
                                    sm:not-sr-only sm:whitespace-nowrap
                                `}
                            >
                                Search
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Search By</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                            checked={searchBy === "title"}
                            onClick={() => handleSearchBy("title")}
                        >
                            Title
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={searchBy === "tags"} onClick={() => handleSearchBy("tags")}>
                            Tags
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={searchBy === "content"}
                            onClick={() => handleSearchBy("content")}
                        >
                            Content
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="gap-1">
                            <ListFilter className="size-3.5" />
                            <span
                                className={`
                                    sr-only
                                    sm:not-sr-only sm:whitespace-nowrap
                                `}
                            >
                                Sort
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked={sort === "title"} onClick={() => handleSort("title")}>
                            Title
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={sort === "createdAt"}
                            onClick={() => handleSort("createdAt")}
                        >
                            Created At
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={sort === "updatedAt"}
                            onClick={() => handleSort("updatedAt")}
                        >
                            Updated At
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="gap-1">
                            <ArrowDownNarrowWide className="size-3.5" />
                            <span
                                className={`
                                    sr-only
                                    sm:not-sr-only sm:whitespace-nowrap
                                `}
                            >
                                Order
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                            checked={order === "ascending"}
                            onClick={() => handleOrder("ascending")}
                        >
                            Ascending
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={order === "descending"}
                            onClick={() => handleOrder("descending")}
                        >
                            Descending
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SectionSubHeader>
            <SectionContent
                className={`
                    grid min-h-24 grid-cols-1 items-start gap-4
                    md:grid-cols-2
                    xl:grid-cols-4
                `}
            >
                {search.length > 0 ? (
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
                        {desktop && (
                            <>
                                <div className="grid gap-4">
                                    {notes.data?.pages.map((page) =>
                                        page.notes.map(
                                            (note, i) =>
                                                i === 0 && (
                                                    <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                                                )
                                        )
                                    )}
                                </div>
                                <div className="grid gap-4">
                                    {notes.data?.pages.map((page) =>
                                        page.notes.map(
                                            (note, i) =>
                                                i === 1 && (
                                                    <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                                                )
                                        )
                                    )}
                                </div>
                                <div className="grid gap-4">
                                    {notes.data?.pages.map((page) =>
                                        page.notes.map(
                                            (note, i) =>
                                                i === 2 && (
                                                    <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                                                )
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
                        )}
                        {tablet && (
                            <>
                                <div className="grid gap-4">
                                    {notes.data?.pages.map((page) =>
                                        page.notes.map(
                                            (note, i) =>
                                                (i === 0 || i === 2) && (
                                                    <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                                                )
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
                        )}
                        {mobile && (
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
                        )}
                    </>
                )}
            </SectionContent>
        </Section>
    );
};

const routeParamsSchema = zod.object({
    sort: zod.enum(["title", "createdAt", "updatedAt"]).catch("title"),
    order: zod.enum(["ascending", "descending"]).catch("ascending"),
    searchBy: zod.enum(["title", "tags", "content"]).catch("title"),
});

export const Route = createFileRoute("/notes/")({
    component: Page,
    validateSearch: (search) => routeParamsSchema.parse(search),
});
