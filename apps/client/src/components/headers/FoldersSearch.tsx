import { useNavigate, useSearch, useRouterState } from "@tanstack/react-router";
import OrderByMenu from "@/dropdowns/search/OrderByMenu";
import SortByMenu from "@/dropdowns/search/SortByMenu";
import Input from "@/ui/Input";
import { SectionSubHeader } from "@/ui/Section";

const FoldersSearch = () => {
    const router = useRouterState();
    const { search } = useSearch({ from: "/_protected/folders/" });
    const navigate = useNavigate();

    const handlerSearch = (searchValue: string) => {
        void navigate({ to: router.location.pathname, search: (prev) => ({ ...prev, search: searchValue }) });
    };

    return (
        <SectionSubHeader className="flex gap-4">
            <Input
                placeholder="Search..."
                className="bg-card"
                value={search}
                onChange={(e) => handlerSearch(e.target.value)}
            />
            <SortByMenu from="/_protected/folders/" additionalSort={[{ name: "Name", value: "name" }]} />
            <OrderByMenu from="/_protected/folders/" />
        </SectionSubHeader>
    );
};

export default FoldersSearch;
