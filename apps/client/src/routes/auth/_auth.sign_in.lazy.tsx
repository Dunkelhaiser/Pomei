import { zodResolver } from "@hookform/resolvers/zod";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { SignInInput, signInSchema } from "shared-types/auth";
import { useSignIn } from "@/api/auth/hooks";
import Button from "@/ui/Button";
import { CardContent, CardHeader, CardTitle } from "@/ui/Card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/Form";
import Input from "@/ui/Input";

const Page = () => {
    const form = useForm<SignInInput>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const signInHandler = useSignIn();

    const onSubmit = (values: SignInInput) => {
        signInHandler.mutate(values);
    };

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl">Sign In</CardTitle>
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
                                    <div className="flex items-center">
                                        <FormLabel>Password</FormLabel>
                                        <Link
                                            to="/auth/forgot_password"
                                            className="ml-auto inline-block text-sm underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" loading={signInHandler.isPending}>
                            Sign In
                        </Button>
                    </form>
                </Form>
                <p className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/auth/sign_up" className="underline">
                        Sign up
                    </Link>
                </p>
            </CardContent>
        </>
    );
};

export const Route = createLazyFileRoute("/auth/_auth/sign_in")({
    component: Page,
});
