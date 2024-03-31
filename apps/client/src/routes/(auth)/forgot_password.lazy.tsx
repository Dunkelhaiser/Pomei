import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { emailSchema, EmailInput } from "shared-types/auth";
import Button from "@/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/Form";
import Input from "@/ui/Input";

const Page = () => {
    const form = useForm<EmailInput>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: EmailInput) => values;

    return (
        <Card
            className={`
                mx-auto w-full max-w-sm
                md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
            `}
        >
            <CardHeader>
                <CardTitle className="text-2xl">Forgot Password</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="mail@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Reset Password</Button>
                    </form>
                </Form>
                <p className="mt-4 text-center text-sm">
                    Remember your password?{" "}
                    <Link to="/sign_in" className="underline">
                        Sign in
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
};

export const Route = createLazyFileRoute("/(auth)/forgot_password")({
    component: Page,
});
