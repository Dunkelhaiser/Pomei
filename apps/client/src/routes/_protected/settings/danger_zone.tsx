import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { PasswordInput, passwordSchema } from "shared-types/auth";
import { useDeleteAccount, useTerminateAllSessions } from "@/api/auth/hooks";
import Button from "@/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/Card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/Form";
import Input from "@/ui/Input";
import Label from "@/ui/Label";

const Page = () => {
    const form = useForm<PasswordInput>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
        },
    });
    const deleteAccountHandler = useDeleteAccount();
    const onSubmit = (values: PasswordInput) => {
        deleteAccountHandler.mutate(values);
    };

    const terminateAllSessionsHandler = useTerminateAllSessions();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>Use with caution.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex flex-col items-start gap-2">
                        <Label>Terminate All Sessions</Label>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => terminateAllSessionsHandler.mutate()}
                            loading={terminateAllSessionsHandler.isPending}
                        >
                            Terminate
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="font-bold">Delete Account</h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" id="password_form">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button variant="destructive" size="sm" className="w-min">
                                    Delete
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const Route = createFileRoute("/_protected/settings/danger_zone")({
    component: Page,
});
