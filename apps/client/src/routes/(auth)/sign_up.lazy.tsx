import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { signUpSchemaWithPasswordConfirmation, SignUpInputWithPasswordConfirmation } from "shared-types/auth";
import { useSignUp } from "@/api/auth/hooks";
import Button from "@/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
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

    const signUpHandler = useSignUp(form.reset);

    const onSubmit = (values: SignUpInputWithPasswordConfirmation) => {
        signUpHandler.mutate({ email: values.email, password: values.password });
    };

    return (
        <Card
            className={`
                mx-auto w-full max-w-sm
                md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
            `}
        >
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
                                        <Input {...field} />
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
                                        <Input {...field} />
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
                    <Link to="/sign_in" className="underline">
                        Sign in
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
};

export const Route = createLazyFileRoute("/(auth)/sign_up")({
    component: Page,
});
