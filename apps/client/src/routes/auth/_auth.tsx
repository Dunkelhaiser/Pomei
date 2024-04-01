import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/api/auth/requests";
import { Card } from "@/ui/Card";

const Page = () => (
    <Card
        className={`
            mx-auto w-full max-w-sm
            md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
        `}
    >
        <Outlet />
    </Card>
);

export const Route = createFileRoute("/auth/_auth")({
    component: Page,
    beforeLoad: async () => {
        const res = await isAuthenticated();
        if (res.message === "Authenticated") {
            throw redirect({
                to: "/",
            });
        }
    },
});
