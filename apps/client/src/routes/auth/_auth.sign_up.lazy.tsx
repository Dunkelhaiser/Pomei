import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { SignUpInputWithPasswordConfirmation, signUpSchemaWithPasswordConfirmation } from "shared-types/auth";
import { useSignUp } from "@/api/auth/hooks";
import Button from "@/ui/Button";
import { CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/Form";
import Input from "@/ui/Input";

const Page = () => {
    const form = useForm<SignUpInputWithPasswordConfirmation>({
        resolver: zodResolver(signUpSchemaWithPasswordConfirmation),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const signUpHandler = useSignUp();

    const onSubmit = (values: SignUpInputWithPasswordConfirmation) => {
        signUpHandler.mutate({ email: values.email, password: values.password });
    };

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl">Sign Up</CardTitle>
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
                        <Button type="submit" loading={signUpHandler.isPending}>
                            Sign Up
                        </Button>
                    </form>
                </Form>
                <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/auth/sign_in" className="underline">
                        Sign in
                    </Link>
                </p>
            </CardContent>
        </>
    );
};

export const Route = createLazyFileRoute("/auth/_auth/sign_up")({
    component: Page,
});
