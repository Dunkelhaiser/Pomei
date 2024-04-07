import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

export const useNotesInfinity = (input: GetNotePaginatedInput) => {
    const { isAuthorized } = useContext(UserContext);

    return useInfiniteQuery({
        queryKey: ["notes", input],
        queryFn: ({ pageParam }) => getNotes({ ...input, page: pageParam }),
        enabled: isAuthorized,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (allPages.length < lastPage.totalPages) {
                return allPages.length + 1;
            }
            return null;
        },
    });
};
