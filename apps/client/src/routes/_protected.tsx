import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/api/auth/requests";

const Page = () => <Outlet />;

export const Route = createFileRoute("/_protected")({
    component: Page,
    beforeLoad: async () => {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            throw redirect({
                to: "/auth/sign_in",
            });
        }
    },
});
