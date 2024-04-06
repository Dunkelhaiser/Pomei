import { GetNotePaginatedInput, Note } from "shared-types/notes";
import { api } from "../api";

export const getNotes = async (input: GetNotePaginatedInput) => {
    const res = await api.get("notes", { searchParams: input, credentials: "include" }).json<Note[]>();
    return res;
};
