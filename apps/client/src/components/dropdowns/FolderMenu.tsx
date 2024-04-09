import { useState } from "react";
import { Folder as FolderType } from "shared-types/folders";
import DeleteFolder from "@/dialogs/DeleteFolder";
import EditFolder from "@/dialogs/EditFolder";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, EllipsisBtn } from "@/ui/DropdownMenu";

interface FolderProps {
    folder: FolderType;
}

const FolderMenu = ({ folder }: FolderProps) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <>
            <EditFolder folder={folder} open={openEdit} setOpen={setOpenEdit} />
            <DeleteFolder folder={folder} open={openDelete} setOpen={setOpenDelete} />
            <DropdownMenu>
                <EllipsisBtn />
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setOpenEdit(true)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem
                        className={`
                            text-destructive
                            focus:text-destructive
                        `}
                        onClick={() => setOpenDelete(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default FolderMenu;
