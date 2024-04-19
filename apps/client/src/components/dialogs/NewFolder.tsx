import { zodResolver } from "@hookform/resolvers/zod";
import { FolderIcon, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NewFolderInput, newFolderSchema } from "shared-types/folders";
import { useCreateFolder } from "@/api/folders/hooks";
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
    AlertDialogTrigger,
} from "@/ui/Modal";

interface Props {
    children?: React.ReactNode;
}

const NewFolder = ({ children }: Props) => {
    const [open, setOpen] = useState(false);
    const form = useForm<NewFolderInput>({
        resolver: zodResolver(newFolderSchema),
        defaultValues: {
            name: "",
            color: "#446b8d",
        },
    });

    const createFolderHandler = useCreateFolder();

    const onSubmit = async (values: NewFolderInput) => {
        await createFolderHandler.mutateAsync(values);
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {children ?? (
                    <Button aria-label="Create Folder" size="floating">
                        <Plus />
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent onCloseAutoFocus={() => form.reset()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>New Folder</AlertDialogTitle>
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
                        Create
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default NewFolder;
