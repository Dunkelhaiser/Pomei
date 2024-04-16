import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useContext } from "react";
import { ArchiveInput, GetNotePaginatedInput, MoveToBinInput, SearchNotesPaginatedInput } from "shared-types/notes";
import { GetByIdInput } from "shared-types/shared";
import { MessageResponse } from "shared-types/utilSchema";
import { toast } from "sonner";
import {
    addToFolder,
    archiveNote,
    deleteNote,
    duplicateNote,
    emptyBin,
    getArchive,
    getBin,
    getNote,
    getNotes,
    moveToBin,
    removeFromFolder,
    searchArchive,
    searchBin,
    searchNotes,
} from "./requests";
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

export const useSearchNotes = (input: SearchNotesPaginatedInput) => {
    const { isAuthorized } = useContext(UserContext);

    return useInfiniteQuery({
        queryKey: ["notes", "search", input],
        queryFn: ({ pageParam }) => searchNotes({ ...input, page: pageParam }),
        enabled: isAuthorized && input.title.length > 0,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (allPages.length < lastPage.totalPages) {
                return allPages.length + 1;
            }
            return null;
        },
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

export const useGetArchive = (input: GetNotePaginatedInput) => {
    const { isAuthorized } = useContext(UserContext);

    return useInfiniteQuery({
        queryKey: ["notes", "archive", input],
        queryFn: ({ pageParam }) => getArchive({ ...input, page: pageParam }),
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

export const useSearchArchive = (input: SearchNotesPaginatedInput) => {
    const { isAuthorized } = useContext(UserContext);

    return useInfiniteQuery({
        queryKey: ["notes", "search", "archive", input],
        queryFn: ({ pageParam }) => searchArchive({ ...input, page: pageParam }),
        enabled: isAuthorized && input.title.length > 0,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (allPages.length < lastPage.totalPages) {
                return allPages.length + 1;
            }
            return null;
        },
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

export const useMoveToBin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ input, params }: { input: MoveToBinInput; params: GetByIdInput }) => moveToBin(input, params),
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
            toast.success(data.isDeleted ? "Note moved to bin successfully" : "Note restored successfully");
        },
    });
};

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNote,
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
                return;
            }
            toast.error("Failed to delete note");
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["notes"] });
            toast.success("Note deleted successfully");
        },
    });
};

export const useGetBin = (input: GetNotePaginatedInput) => {
    const { isAuthorized } = useContext(UserContext);

    return useInfiniteQuery({
        queryKey: ["notes", "bin", input],
        queryFn: ({ pageParam }) => getBin({ ...input, page: pageParam }),
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

export const useSearchBin = (input: SearchNotesPaginatedInput) => {
    const { isAuthorized } = useContext(UserContext);

    return useInfiniteQuery({
        queryKey: ["notes", "search", "bin", input],
        queryFn: ({ pageParam }) => searchBin({ ...input, page: pageParam }),
        enabled: isAuthorized && input.title.length > 0,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (allPages.length < lastPage.totalPages) {
                return allPages.length + 1;
            }
            return null;
        },
    });
};

export const useEmptyBin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: emptyBin,
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
                return;
            }
            toast.error("Failed to empty bin");
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["notes", "bin"] });
            toast.success("Bin emptied successfully");
        },
    });
};

export const useAddToFolder = (params: GetByIdInput) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: GetByIdInput) => addToFolder(params, input),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
                return;
            }
            toast.error("Failed to add note to folder");
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["notes"] });
            void queryClient.invalidateQueries({ queryKey: ["folders"] });
            toast.success("Note added to folder successfully");
        },
    });
};

export const useRemoveFromFolder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: GetByIdInput) => removeFromFolder(params),
        onError: async (err) => {
            if (err instanceof HTTPError) {
                const error = (await err.response.json()) as MessageResponse;
                toast.error(error.message);
                return;
            }
            toast.error("Failed to remove note to folder");
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ["notes"] });
            void queryClient.invalidateQueries({ queryKey: ["folders"] });
            toast.success("Note remove from folder successfully");
        },
    });
};

export const useNote = (params: GetByIdInput) => {
    const { isAuthorized } = useContext(UserContext);

    return useQuery({
        queryKey: ["note", params],
        queryFn: () => getNote(params),
        enabled: isAuthorized,
    });
};
