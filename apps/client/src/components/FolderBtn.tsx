import { FolderIcon } from "lucide-react";
import { Folder } from "shared-types/folders";
import { useAddToFolder } from "@/api/notes/hooks";
import { Card, CardContent } from "@/ui/Card";
import { cn } from "@/utils/utils";

interface Props {
    folder: Folder;
    noteId: string;
    disabled?: boolean;
    close: () => void;
}

export const FolderBtn = ({ folder, noteId, disabled, close }: Props) => {
    const addToFolderHanlder = useAddToFolder({ id: noteId });

    const onSubmit = async () => {
        await addToFolderHanlder.mutateAsync({ id: folder.id });
        close();
    };

    return (
        <button
            type="button"
            className={cn(
                `
                    relative block w-full translate-y-0 ring-accent-foreground ring-offset-background transition duration-300
                    hover:-translate-y-px
                    focus-visible:-translate-y-px
                `,
                disabled && "pointer-events-none opacity-50"
            )}
            onClick={onSubmit}
        >
            <Card key={folder.id}>
                <CardContent className="flex items-center gap-2 px-4 py-2">
                    <FolderIcon size={32} color={folder.color} fill={folder.color} />
                    <p className="font-medium">{folder.name}</p>
                </CardContent>
            </Card>
        </button>
    );
};
