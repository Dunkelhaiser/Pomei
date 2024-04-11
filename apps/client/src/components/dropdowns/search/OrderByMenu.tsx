import { useNavigate, useRouterState, useSearch } from "@tanstack/react-router";
import { ArrowDownNarrowWide } from "lucide-react";
import { FoldersRoutes, NotesRoutes } from "@/types/routes";
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
    from: NotesRoutes | FoldersRoutes;
}

const OrderByMenu = ({ from }: Props) => {
    const router = useRouterState();
    const { order } = useSearch({ from });
    const navigate = useNavigate();

    const handleOrder = (orderValue: "ascending" | "descending") => {
        void navigate({
            to: router.location.pathname,
            search: (prev) => ({ ...prev, order: orderValue }),
        });
    };

    return (
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
                <DropdownMenuLabel>Order by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={order === "ascending"} onClick={() => handleOrder("ascending")}>
                    Ascending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={order === "descending"} onClick={() => handleOrder("descending")}>
                    Descending
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default OrderByMenu;
