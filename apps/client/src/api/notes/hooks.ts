import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { GetNotePaginatedInput } from "shared-types/notes";
import { getNotes } from "./requests";
import { UserContext } from "@/context/User";

export const useNotes = (input: GetNotePaginatedInput) => {
    const { isAuthorized } = useContext(UserContext);

    return useQuery({
        queryKey: ["notes", input],
        queryFn: () => getNotes(input),
        enabled: isAuthorized,
    });
};
