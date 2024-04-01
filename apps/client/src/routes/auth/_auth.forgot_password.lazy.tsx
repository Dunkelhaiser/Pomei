import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { EmailInput, emailSchema } from "shared-types/auth";
import { useResetPasswordRequest } from "@/api/auth/hooks";
import Button from "@/ui/Button";
import { CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/Form";
import Input from "@/ui/Input";

const Page = () => {
    const form = useForm<EmailInput>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
    });

    const resetPasswordRequestHandler = useResetPasswordRequest();

    const onSubmit = (values: EmailInput) => {
        resetPasswordRequestHandler.mutate(values);
    };

    return (
        <>
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
                        <Button type="submit" loading={resetPasswordRequestHandler.isPending}>
                            Reset Password
                        </Button>
                    </form>
                </Form>
                <p className="mt-4 text-center text-sm">
                    Remember your password?{" "}
                    <Link to="/auth/sign_in" className="underline">
                        Sign in
                    </Link>
                </p>
            </CardContent>
        </>
    );
};

export const Route = createLazyFileRoute("/auth/_auth/forgot_password")({
    component: Page,
});
