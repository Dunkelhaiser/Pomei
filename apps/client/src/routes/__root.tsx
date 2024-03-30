import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Button from "@/ui/Button";

const Page = () => (
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
);

const NotFound = () => (
    <section
        className={`
            px-4 py-10 text-center
            sm:px-6
            lg:flex lg:h-full lg:flex-col lg:items-center lg:justify-center lg:px-8
        `}
    >
        <h1
            className={`
                block text-7xl font-bold text-gray-800
                dark:text-white
                sm:text-9xl
            `}
        >
            404
        </h1>
        <p
            className={`
                text-gray-600
                dark:text-gray-400
            `}
        >
            Looks like the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild variant="link" className="mt-5">
            <Link to="/">
                <ChevronLeft size={16} />
                Back to home
            </Link>
        </Button>
    </section>
);

export const Route = createRootRoute({
    component: Page,
    notFoundComponent: NotFound,
});
