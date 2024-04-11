import { useNavigate, useSearch, useRouterState } from "@tanstack/react-router";
import OrderByMenu from "@/dropdowns/search/OrderByMenu";
import SearchByMenu from "@/dropdowns/search/SearchByMenu";
import SortByMenu from "@/dropdowns/search/SortByMenu";
import Input from "@/ui/Input";
import { SectionSubHeader } from "@/ui/Section";

const NotesSearch = () => {
    const router = useRouterState();
    const { sort, order, searchBy, search } = useSearch({ from: "/notes/" });
    const navigate = useNavigate();

    const handlerSearch = (searchValue: string) => {
        void navigate({ to: router.location.pathname, search: { sort, order, searchBy, search: searchValue } });
    };

    return (
        <SectionSubHeader className="flex gap-4">
            <Input
                placeholder="Search..."
                className="bg-card"
                value={search}
                onChange={(e) => handlerSearch(e.target.value)}
            />
            <SearchByMenu
                searchBy={[
                    { name: "Title", value: "title" },
                    { name: "Tags", value: "tags" },
                    { name: "Content", value: "content" },
                ]}
            />
            <SortByMenu additionalSort={[{ name: "Title", value: "title" }]} />
            <OrderByMenu />
        </SectionSubHeader>
    );
};

export default NotesSearch;
