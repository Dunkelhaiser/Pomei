import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useContext } from "react";
import { ArchiveInput, GetNotePaginatedInput, GetNotesInput } from "shared-types/notes";
import { GetByIdInput } from "shared-types/shared";
import { MessageResponse } from "shared-types/utilSchema";
import { toast } from "sonner";
import { archiveNote, duplicateNote, getArchive, getNotes, searchNotes } from "./requests";
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

export const useSearchNotes = (input: GetNotesInput) => {
    const { isAuthorized } = useContext(UserContext);
    return useQuery({
        queryKey: ["notes", "search", input],
        queryFn: () => searchNotes(input),
        enabled: isAuthorized && input.title.length > 0,
    });
};

export const useArchiveNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ input, params }: { input: ArchiveInput; params: GetByIdInput }) =>
            archiveNote(input, params),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
                return;
            }
            toast.error("Failed to modify note");
        },
        onSuccess: (data) => {
            void queryClient.invalidateQueries({ queryKey: ["notes"] });
            toast.success(data.isArchived ? "Note archivated successfully" : "Note unarchivated successfully");
        },
    });
};

export const useGetArchive = () => {
    const { isAuthorized } = useContext(UserContext);

    return useQuery({
        queryKey: ["notes", "archive"],
        queryFn: getArchive,
        enabled: isAuthorized,
    });
};

export const useDuplicateNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: duplicateNote,
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
                return;
            }
            toast.error("Failed to duplicate note");
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["notes"] });
            toast.success("Note duplicated successfully");
        },
    });
};
