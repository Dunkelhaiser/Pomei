import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { PasswordInputWithConfirmation, passwordSchemaWithConfirmation } from "shared-types/auth";
import { useResetPassword } from "@/api/auth/hooks";
import Button from "@/ui/Button";
import { CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/Form";
import Input from "@/ui/Input";

const Page = () => {
    const { token } = Route.useParams();
    const form = useForm<PasswordInputWithConfirmation>({
        resolver: zodResolver(passwordSchemaWithConfirmation),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const resetPasswordHandler = useResetPassword(token);

    const onSubmit = (values: PasswordInputWithConfirmation) => {
        resetPasswordHandler.mutate(values);
    };

    return (
        <>
            <Helmet>
                <title>Pomei - Reset Password</title>
            </Helmet>
            <CardHeader>
                <CardTitle className="text-2xl">Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" loading={resetPasswordHandler.isPending}>
                            Reset
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </>
    );
};

export const Route = createLazyFileRoute("/auth/_auth/reset_password/$token")({
    component: Page,
});
