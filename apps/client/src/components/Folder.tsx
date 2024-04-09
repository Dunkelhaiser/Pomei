import { Folder as FolderIcon } from "lucide-react";
import { Folder as FolderType } from "shared-types/folders";
import FolderMenu from "@/dropdowns/FolderMenu";
import { CardContent, CardHeader } from "@/ui/Card";
import { CardLink, CardLinkAnchor } from "@/ui/CardLink";

interface FolderProps {
    folder: FolderType;
}

const Folder = ({ folder }: FolderProps) => {
    return (
        <CardLink>
            <CardContent className="grid place-items-center p-6 pb-4">
                <FolderIcon size={72} color={folder.color} fill={folder.color} />
            </CardContent>
            <CardHeader className="grid grid-cols-[18px_1fr_18px] gap-2 pt-0">
                <CardLinkAnchor
                    to="/folders/$folderId"
                    params={{ folderId: folder.id }}
                    className="col-start-2 text-center text-lg font-medium"
                >
                    {folder.name}
                </CardLinkAnchor>
                <FolderMenu folder={folder} />
            </CardHeader>
        </CardLink>
    );
};

export default Folder;
