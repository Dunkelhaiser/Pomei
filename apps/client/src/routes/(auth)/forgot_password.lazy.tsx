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
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="mail@example.com" required />
                </div>
                <Button type="submit">Reset Password</Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Remember your password?{" "}
                <Link to="/sign_in" className="underline">
                    Sign in
                </Link>
            </div>
        </CardContent>
    </Card>
);

export const Route = createLazyFileRoute("/(auth)/forgot_password")({
    component: Page,
});
