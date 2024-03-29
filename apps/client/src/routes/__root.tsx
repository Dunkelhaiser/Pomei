import { createRootRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "@/components/Sidebar";

export const Route = createRootRoute({
    component: () => (
        <div
            className={`
                flex h-screen flex-col
                lg:flex-row
            `}
        >
            <Sidebar />
            <main
                className={`
                    w-full grow bg-background p-4 text-foreground
                    sm:p-6
                    md:px-8 md:py-7
                    lg:pl-12 lg:pr-14
                `}
            >
                <Outlet />
            </main>
        </div>
    ),
});
