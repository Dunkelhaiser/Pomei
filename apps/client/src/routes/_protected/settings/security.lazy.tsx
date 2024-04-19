import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { NewPasswordInputWithConfirmation, newPasswordSchemaWithConfirmation } from "shared-types/auth";
import { useChangePassword } from "@/api/auth/hooks";
import Button from "@/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/Card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/Form";
import Input from "@/ui/Input";

const Page = () => {
    const form = useForm<NewPasswordInputWithConfirmation>({
        resolver: zodResolver(newPasswordSchemaWithConfirmation),
        defaultValues: {
            oldPassword: "",
            password: "",
            confirmPassword: "",
        },
    });

    const changePasswordHandler = useChangePassword();

    const onSubmit = (values: NewPasswordInputWithConfirmation) => {
        changePasswordHandler.mutate(values);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>All sessions will be ended when changing password.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" id="password_form">
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Old Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button type="submit" loading={changePasswordHandler.isPending} form="password_form">
                    Change
                </Button>
            </CardFooter>
        </Card>
    );
};

export const Route = createLazyFileRoute("/_protected/settings/security")({
    component: Page,
});
