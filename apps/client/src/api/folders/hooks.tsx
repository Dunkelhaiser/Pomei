import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useContext } from "react";
import { GetFolderInput, GetFolderPaginatedInput, NewFolderInput } from "shared-types/folders";
import { GetByIdInput } from "shared-types/shared";
import { MessageResponse } from "shared-types/utilSchema";
import { toast } from "sonner";
import { createFolder, editFolder, getFolders, searchFolders } from "./requests";
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

export const useCreateFolder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: NewFolderInput) => createFolder(input),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
                return;
            }
            toast.error("Failed to create folder");
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["folders"] });
            toast.success("Folder created successfully");
        },
    });
};

export const useEditFolder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ input, params }: { input: NewFolderInput; params: GetByIdInput }) => editFolder(input, params),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
                return;
            }
            toast.error("Failed to edit folder");
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["folders"] });
            toast.success("Folder edited successfully");
        },
    });
};
