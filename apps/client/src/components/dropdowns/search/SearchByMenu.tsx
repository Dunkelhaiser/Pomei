import { useNavigate, useRouterState, useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
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
    searchBy: {
        name: string;
        value: string;
    }[];
}

const SearchByMenu = ({ searchBy }: Props) => {
    const router = useRouterState();
    const { searchBy: searchByQuery } = useSearch({ from: "/notes/" });
    const navigate = useNavigate();

    const handleSearchBy = (searchByValue: string) => {
        void navigate({ to: router.location.pathname, search: (prev) => ({ ...prev, searchBy: searchByValue }) });
    };

    return (
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
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {searchBy.map((searchByValue) => (
                    <DropdownMenuCheckboxItem
                        key={searchByValue.value}
                        checked={searchByQuery === searchByValue.value}
                        onClick={() => handleSearchBy(searchByValue.value)}
                    >
                        {searchByValue.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default SearchByMenu;
