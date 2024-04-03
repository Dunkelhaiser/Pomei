import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/api/auth/requests";

export const Route = createFileRoute("/_protected")({
    beforeLoad: async () => {
        const authenticated = await isAuthenticated();
        if (!authenticated) {
            throw redirect({
                to: "/auth/sign_in",
            });
        }
    },
});
