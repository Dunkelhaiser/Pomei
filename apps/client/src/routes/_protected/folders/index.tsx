import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownNarrowWide, ListFilter } from "lucide-react";
import { useEffect, useState } from "react";
import { z as zod } from "zod";
import { useGetFoldersInfinity, useSearchFolders } from "@/api/folders/hooks";
import NewFolder from "@/components/dialogs/NewFolder";
import Folder from "@/components/Folder";
import { useIntersection } from "@/hooks/useIntersection";
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
    const { sort, order } = Route.useSearch();
    const navigate = Route.useNavigate();
    const folders = useGetFoldersInfinity({ page: 1, limit: 4, orderBy: sort, order });
    const searchFolders = useSearchFolders({ name: search });
    const { isIntersecting, ref } = useIntersection({
        threshold: 0,
    });

    useEffect(() => {
        if (isIntersecting && folders.hasNextPage) void folders.fetchNextPage();
    }, [isIntersecting, folders]);

    const handleSort = (sortValue: "name" | "createdAt" | "updatedAt") => {
        void navigate({ to: "/folders", search: { sort: sortValue, order } });
    };

    const handleOrder = (orderValue: "ascending" | "descending") => {
        void navigate({ to: "/folders", search: { sort, order: orderValue } });
    };

    return (
        <Section>
            <SectionHeader>Folders</SectionHeader>
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
                        <DropdownMenuCheckboxItem checked={sort === "name"} onClick={() => handleSort("name")}>
                            Name
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
                <NewFolder />
                {/* eslint-disable no-nested-ternary */}
                {search.length > 0 ? (
                    searchFolders.isLoading ? (
                        <Loader className="col-span-full self-center justify-self-center" />
                    ) : searchFolders.data && searchFolders.data.length > 0 ? (
                        searchFolders.data.map((folder) => <Folder folder={folder} key={folder.id} />)
                    ) : (
                        <p>No folders found.</p>
                    )
                ) : folders.isLoading ? (
                    <Loader className="col-span-full self-center justify-self-center" />
                ) : (
                    folders.data?.pages.map((page) =>
                        page.folders.map((folder, i) =>
                            i === 3 ? (
                                <div key={folder.id} ref={ref}>
                                    <Folder folder={folder} />
                                </div>
                            ) : (
                                <Folder folder={folder} key={folder.id} />
                            )
                        )
                    )
                )}
            </SectionContent>
        </Section>
    );
};

const routeParamsSchema = zod.object({
    sort: zod.enum(["name", "createdAt", "updatedAt"]).catch("name"),
    order: zod.enum(["ascending", "descending"]).catch("ascending"),
});

export const Route = createFileRoute("/_protected/folders/")({
    component: Page,
    validateSearch: (search) => routeParamsSchema.parse(search),
});
