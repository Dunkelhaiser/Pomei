import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { GetFolderInput, GetFolderPaginatedInput } from "shared-types/folders";
import { getFolders, searchFolders } from "./requests";
import { UserContext } from "@/context/User";

export const useFolders = (input: GetFolderPaginatedInput) => {
    const { isAuthorized } = useContext(UserContext);

    return useQuery({
        queryKey: ["folders", input],
        queryFn: () => getFolders(input),
        enabled: isAuthorized,
    });
};

export const useGetFoldersInfinity = (input: GetFolderPaginatedInput) => {
    const { isAuthorized } = useContext(UserContext);

    return useInfiniteQuery({
        queryKey: ["folders", input],
        queryFn: ({ pageParam }) => getFolders({ ...input, page: pageParam }),
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

export const useSearchFolders = (input: GetFolderInput) => {
    const { isAuthorized } = useContext(UserContext);
    return useQuery({
        queryKey: ["folders", "search", input],
        queryFn: () => searchFolders(input),
        enabled: isAuthorized && input.name.length > 0,
    });
};
