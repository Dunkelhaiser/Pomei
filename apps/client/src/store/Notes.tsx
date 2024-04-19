import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface LocalNote {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export const notesAtom = atomWithStorage("notes", [] as LocalNote[]);

export const latestNotesAtom = atom((get) =>
    get(notesAtom)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 4)
);

export const noteByIdAtom = atom((get) => (id: string) => get(notesAtom).find((n) => n.id === id));

export const notesSearchAtom = atom(
    (get) => (search: string, searchBy: "title" | "content") =>
        get(notesAtom).filter((n) => n[searchBy].toLowerCase().includes(search.toLowerCase()))
);

export const notesOrderAtom = atom(
    (get) => (orderBy: "title" | "createdAt" | "updatedAt", order: "ascending" | "descending") =>
        get(notesAtom).sort((a, b) => {
            if (order === "ascending") {
                return a[orderBy].localeCompare(b[orderBy]);
            }
            return b[orderBy].localeCompare(a[orderBy]);
        })
);
