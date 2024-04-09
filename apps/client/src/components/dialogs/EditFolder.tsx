import { zodResolver } from "@hookform/resolvers/zod";
import { FolderIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Folder, NewFolderInput, newFolderSchema } from "shared-types/folders";
import { useEditFolder } from "@/api/folders/hooks";
import Button from "@/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/Form";
import Input from "@/ui/Input";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/ui/Modal";

interface Props {
    folder: Folder;
    children: React.ReactNode;
}

const EditFolder = ({ folder, children }: Props) => {
    const [open, setOpen] = useState(false);
    const form = useForm<NewFolderInput>({
        resolver: zodResolver(newFolderSchema),
        defaultValues: {
            name: folder.name,
            color: folder.color,
        },
    });

    const editFolderHandler = useEditFolder();

    const onSubmit = async (values: NewFolderInput) => {
        await editFolderHandler.mutateAsync({ input: values, params: { id: folder.id } });
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {children}
            <AlertDialogContent onCloseAutoFocus={() => form.reset()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit Folder</AlertDialogTitle>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" id="folder_form">
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                    <FormLabel className="block w-min cursor-pointer">
                                        <FolderIcon size={92} color={form.watch("color")} fill={form.watch("color")} />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="color"
                                            aria-label="Color"
                                            className="invisible size-0 p-0"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Folder Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button type="submit" form="folder_form" loading={form.formState.isSubmitting}>
                        Edit
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default EditFolder;
