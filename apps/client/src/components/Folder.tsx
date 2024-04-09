import { Link } from "@tanstack/react-router";
import { EllipsisVertical, Folder as FolderIcon } from "lucide-react";
import { useState } from "react";
import { Folder as FolderType } from "shared-types/folders";
import DeleteFolder from "./dialogs/DeleteFolder";
import EditFolder from "./dialogs/EditFolder";
import { Card, CardContent, CardHeader } from "./ui/Card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu";

interface FolderProps {
    folder: FolderType;
}

const Folder = ({ folder }: FolderProps) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <Card
            className={`
                group relative max-w-full translate-y-0 scroll-p-6 ring-accent-foreground ring-offset-background transition duration-300
                hover:translate-y-[-1.5px]
                focus-visible:translate-y-[-1.5px]
                group-focus-visible:translate-y-[-1.5px]
                has-[a:focus-visible]:translate-y-[-1.5px]
                has-[button:focus-visible]:translate-y-[-1.5px]
                has-[a:focus-visible]:ring-2
                has-[button:focus-visible]:ring-2
                has-[a:focus-visible]:ring-offset-0
                has-[button:focus-visible]:ring-offset-0
            `}
        >
            <EditFolder folder={folder} open={openEdit} setOpen={setOpenEdit} />
            <DeleteFolder folder={folder} open={openDelete} setOpen={setOpenDelete} />
            <CardContent className="grid place-items-center p-6 pb-4">
                <FolderIcon size={72} color={folder.color} fill={folder.color} />
            </CardContent>
            <CardHeader className="grid grid-cols-[18px_1fr_18px] gap-2 pt-0">
                <Link
                    to="/folders/$folderId"
                    params={{ folderId: folder.id }}
                    className={`
                        col-start-2 line-clamp-1 text-center text-lg font-medium outline-none
                        after:absolute after:inset-0 after:content-['']
                    `}
                >
                    {folder.name}
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        type="button"
                        className={`
                            z-50 justify-self-end transition-all duration-300
                            lg:invisible lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100
                            lg:group-has-[a:focus-visible]:visible lg:group-has-[button:focus-visible]:visible
                            lg:group-has-[a:focus-visible]:opacity-100 lg:group-has-[button:focus-visible]:opacity-100
                            lg:aria-expanded:visible lg:aria-expanded:opacity-100
                        `}
                    >
                        <EllipsisVertical size={18} />
                    </DropdownMenuTrigger>
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
            </CardHeader>
        </Card>
    );
};

export default Folder;
