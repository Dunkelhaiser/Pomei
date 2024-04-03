import { Link as RouterLink } from "@tanstack/react-router";
import { Archive, Folder, Home, LogIn, Menu, StickyNote, Trash, User } from "lucide-react";
import { useContext, useState } from "react";
import { useSignOut } from "@/api/auth/hooks";
import { UserContext } from "@/context/User";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { cn } from "@/utils/utils";

interface LinkProps {
    title: string;
    icon: React.ReactNode;
    href: string;
    close?: () => void;
}

const Link = ({ title, icon, href, close }: LinkProps) => (
    <RouterLink
        className={cn(`
            flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-primary-foreground transition-colors hover:bg-foreground/10 focus-visible:bg-foreground/10
            dark:hover:bg-foreground/5 dark:focus-visible:bg-foreground/5
            [&.active]:bg-foreground/20 [&.active]:dark:bg-foreground/10
        `)}
        to={href}
        onClick={close}
    >
        {icon}
        {title}
    </RouterLink>
);

const links = [
    { title: "Home", icon: <Home size={16} />, href: "/" },
    { title: "Notes", icon: <StickyNote size={16} />, href: "notes" },
    { title: "Folders", icon: <Folder size={16} />, href: "folders" },
    { title: "Archive", icon: <Archive size={16} />, href: "archive" },
    { title: "Bin", icon: <Trash size={16} />, href: "bin" },
];

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { user } = useContext(UserContext);

    const signOutHandler = useSignOut();

    return (
        <>
            <div
                className={`
                    sticky inset-x-0 top-0 z-20 border-y bg-background px-4
                    dark:border-gray-700 dark:bg-gray-800
                    sm:px-6
                    md:px-8
                    lg:hidden
                `}
            >
                <div className="flex items-center py-4">
                    <button
                        type="button"
                        className={`
                            text-foreground/65
                            hover:text-foreground/50
                        `}
                        onClick={() => setIsExpanded(true)}
                        aria-controls="sidebar"
                        aria-label="Toggle navigation"
                    >
                        <Menu size={20} />
                    </button>

                    <ol className="ms-3 flex items-center whitespace-nowrap" aria-label="Breadcrumb">
                        <li
                            className={`
                                flex items-center text-sm text-gray-800
                                dark:text-gray-400
                            `}
                        >
                            Home
                        </li>
                        {/* <ChevronRight
                            size={16}
                            className={`
                                    mx-3 shrink-0 overflow-visible text-gray-400
                                    dark:text-gray-600
                                `}
                        />
                        <li
                            className={`
                                truncate text-sm font-semibold text-gray-800
                                dark:text-gray-400
                            `}
                            aria-current="page"
                        >
                            Folder Name
                        </li> */}
                    </ol>
                </div>
            </div>

            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
                className={`
                    absolute inset-0 z-[998] bg-slate-950/50 transition-all
                    ${isExpanded ? "visible opacity-100" : "invisible opacity-0"}
                    lg:hidden
                `}
                onClick={() => setIsExpanded(false)}
            />
            <div
                className={`
                    fixed top-0 z-[999] flex h-screen w-64 -translate-x-full flex-col overflow-y-auto bg-primary pb-10 pt-7
                    transition-transform
                    lg:static
                    ${isExpanded && "translate-x-0"}
                    lg:w-72 lg:translate-x-0
                `}
            >
                <RouterLink className="px-6" to="/">
                    <img src="/logo.svg" className="rounded-lg bg-primary-foreground p-3" alt="Pomei Logo" />
                </RouterLink>

                <nav className="flex w-full grow flex-col justify-between gap-y-4 p-6">
                    <ul className="space-y-2">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link {...link} close={() => setIsExpanded(false)} />
                            </li>
                        ))}
                    </ul>
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                className={cn(`
                                                flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-primary-foreground transition-colors hover:bg-foreground/10 focus-visible:bg-foreground/10 dark:hover:bg-foreground/5 dark:focus-visible:bg-foreground/5
                                                [&.active]:bg-foreground/20 [&.active]:dark:bg-foreground/10
                                            `)}
                            >
                                <User size={16} /> Account
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className="text-xs">{user.email}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <RouterLink to="/settings" onClick={() => setIsExpanded(false)}>
                                        Settings
                                    </RouterLink>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOutHandler.mutate()}>Sign Out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link
                            title="Sign In"
                            icon={<LogIn size={16} />}
                            href="/auth/sign_in"
                            close={() => setIsExpanded(false)}
                        />
                    )}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
