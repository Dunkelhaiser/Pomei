import { useNavigate, useRouterState, useSearch } from "@tanstack/react-router";
import { ListFilter } from "lucide-react";
import Button from "@/ui/Button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/ui/DropdownMenu";

interface Props {
    from: "/notes/" | "/_protected/folders/";
    additionalSort: {
        name: string;
        value: string;
    }[];
}

const SortByMenu = ({ additionalSort, from }: Props) => {
    const router = useRouterState();
    const { sort } = useSearch({ from });
    const navigate = useNavigate();

    const handleSort = (sortValue: string) => {
        void navigate({ to: router.location.pathname, search: (prev) => ({ ...prev, sort: sortValue }) });
    };

    return (
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
                {additionalSort.map((sortValue) => (
                    <DropdownMenuCheckboxItem
                        key={sortValue.value}
                        checked={sort === sortValue.value}
                        onClick={() => handleSort(sortValue.value)}
                    >
                        {sortValue.name}
                    </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuCheckboxItem checked={sort === "createdAt"} onClick={() => handleSort("createdAt")}>
                    Created At
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={sort === "updatedAt"} onClick={() => handleSort("updatedAt")}>
                    Updated At
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default SortByMenu;
