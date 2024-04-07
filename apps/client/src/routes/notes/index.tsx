import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownNarrowWide, ListFilter } from "lucide-react";
import { useEffect } from "react";
import { z as zod } from "zod";
import { useNotesInfinity } from "@/api/notes/hooks";
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
    const { sort, order } = Route.useSearch();
    const navigate = Route.useNavigate();
    const notes = useNotesInfinity({ page: 1, limit: 4, orderBy: sort, order });
    const { isIntersecting, ref } = useIntersection({
        threshold: 0,
    });

    const mobile = useMediaQuery("(max-width: 639px)");
    const tablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
    const desktop = useMediaQuery("(min-width: 1024px)");

    useEffect(() => {
        if (isIntersecting && notes.hasNextPage) void notes.fetchNextPage();
    }, [isIntersecting, notes]);

    useEffect(() => {
        const notesSort = localStorage.getItem("notesSort");
        const notesOrder = localStorage.getItem("notesOrder");

        const notesSortValid =
            notesSort === "order" || notesSort === "title" || notesSort === "createdAt" || notesSort === "updatedAt";

        const notesOrderValid = notesOrder === "ascending" || notesOrder === "descending";

        if (!notesSortValid) {
            localStorage.setItem("notesSort", "order");
        }
        if (!notesOrderValid) {
            localStorage.setItem("notesOrder", "ascending");
        }
        void navigate({
            to: "/notes",
            search: {
                sort: notesSortValid ? notesSort : "order",
                order: notesOrderValid ? notesOrder : "ascending",
            },
        });
    }, [navigate]);

    const handleSort = (sortValue: "title" | "createdAt" | "updatedAt" | "order") => {
        void navigate({ to: "/notes", search: { sort: sortValue, order } });
        localStorage.setItem("notesSort", sortValue);
    };

    const handleOrder = (orderValue: "ascending" | "descending") => {
        void navigate({ to: "/notes", search: { sort, order: orderValue } });
        localStorage.setItem("notesOrder", orderValue);
    };

    return (
        <Section>
            <SectionHeader>Notes</SectionHeader>
            <SectionSubHeader className="flex gap-4">
                <Input placeholder="Search..." className="bg-card" />
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
                        <DropdownMenuCheckboxItem checked={sort === "order"} onClick={() => handleSort("order")}>
                            Order
                        </DropdownMenuCheckboxItem>
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
                {notes.isLoading ? (
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
                                            <>
                                                {i === 1 && (
                                                    <Note lineClamp="line-clamp-[18]" note={note} key={note.id} />
                                                )}
                                                {i === 3 && (
                                                    <div key={note.id} ref={ref}>
                                                        <Note lineClamp="line-clamp-[18]" note={note} />
                                                    </div>
                                                )}
                                            </>
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
    sort: zod.enum(["title", "createdAt", "updatedAt", "order"]).catch("order"),
    order: zod.enum(["ascending", "descending"]).catch("ascending"),
});

export const Route = createFileRoute("/notes/")({
    component: Page,
    validateSearch: (search) => routeParamsSchema.parse(search),
});
