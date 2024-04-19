import { useNavigate, useSearch, useRouterState } from "@tanstack/react-router";
import { useContext } from "react";
import { UserContext } from "@/context/User";
import OrderByMenu from "@/dropdowns/search/OrderByMenu";
import SearchByMenu from "@/dropdowns/search/SearchByMenu";
import SortByMenu from "@/dropdowns/search/SortByMenu";
import { NotesRoutes } from "@/types/routes";
import Input from "@/ui/Input";
import { SectionSubHeader } from "@/ui/Section";

interface Props {
    from: NotesRoutes;
}

const NotesSearch = ({ from }: Props) => {
    const { isAuthorized } = useContext(UserContext);
    const router = useRouterState();
    const { search } = useSearch({ from });
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
            <SearchByMenu
                from={from}
                searchBy={
                    isAuthorized
                        ? [
                              { name: "Title", value: "title" },
                              { name: "Tags", value: "tags" },
                              { name: "Content", value: "content" },
                          ]
                        : [
                              { name: "Title", value: "title" },
                              { name: "Content", value: "content" },
                          ]
                }
            />
            <SortByMenu from={from} additionalSort={[{ name: "Title", value: "title" }]} />
            <OrderByMenu from={from} />
        </SectionSubHeader>
    );
};

export default NotesSearch;
