import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { EmailInput, emailSchema } from "shared-types/auth";
import { useChangeEmail } from "@/api/auth/hooks";
import { UserContext } from "@/context/User";
import Button from "@/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/Card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/Form";
import Input from "@/ui/Input";

const Page = () => {
    const { user } = useContext(UserContext);
    const form = useForm<EmailInput>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: user?.email,
        },
    });

    const changeEmailHandler = useChangeEmail();

    const onSubmit = (values: EmailInput) => {
        if (values.email === user?.email) {
            form.setError("email", { message: "Enter new email to change to" });
            return;
        }
        changeEmailHandler.mutate(values);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Email</CardTitle>
                <CardDescription>Used to identify your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" id="email_form">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="mail@example.com" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button type="submit" loading={changeEmailHandler.isPending} form="email_form">
                    Change
                </Button>
            </CardFooter>
        </Card>
    );
};

export const Route = createFileRoute("/_protected/settings/general")({
    component: Page,
});
