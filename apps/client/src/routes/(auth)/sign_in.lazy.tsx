import { Link, createLazyFileRoute } from "@tanstack/react-router";
import Button from "@/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";
import Input from "@/ui/Input";
import Label from "@/ui/Label";

const Page = () => (
    <Card
        className={`
            mx-auto w-full max-w-sm
            md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
        `}
    >
        <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="mail@example.com" required />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/" className="ml-auto inline-block text-sm underline">
                            Forgot your password?
                        </Link>
                    </div>
                    <Input id="password" type="password" required />
                </div>
                <Button type="submit">Sign In</Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/" className="underline">
                    Sign up
                </Link>
            </div>
        </CardContent>
    </Card>
);

export const Route = createLazyFileRoute("/(auth)/sign_in")({
    component: Page,
});
