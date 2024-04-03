import { Link, Outlet, createLazyFileRoute } from "@tanstack/react-router";
import Separator from "@/ui/Separator";

const Page = () => (
    <section
        className={`
            flex flex-1 flex-col gap-4
            md:gap-8
        `}
    >
        <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div
            className={`
                mx-auto grid w-full max-w-6xl items-start gap-6
                md:grid-cols-[180px_1fr]
                lg:grid-cols-[250px_1fr]
            `}
        >
            <nav className="grid gap-4 text-sm text-muted-foreground">
                <ul className="grid gap-4">
                    <li>
                        <Link to="/settings/general" className="[&.active]:font-semibold [&.active]:text-primary">
                            General
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings/security" className="[&.active]:font-semibold [&.active]:text-primary">
                            Security
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="[&.active]:font-semibold [&.active]:text-destructive">
                            Danger Zone
                        </Link>
                    </li>
                </ul>
                <Separator />
                <Link href="#">Sign Out</Link>
            </nav>
            <div className="grid gap-6">
                <Outlet />
            </div>
        </div>
    </section>
);

export const Route = createLazyFileRoute("/_protected/settings")({
    component: Page,
});
