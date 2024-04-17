import { Link as RouterLink } from "@tanstack/react-router";
import { Archive, Folder, Home, LogIn, Menu, Monitor, Moon, StickyNote, Sun, Trash, User } from "lucide-react";
import { useContext, useState } from "react";
import { useSignOut } from "@/api/auth/hooks";
import { ThemeContext } from "@/context/Theme";
import { UserContext } from "@/context/User";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/ui/DropdownMenu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/Select";
import { cn } from "@/utils/utils";

interface LinkProps {
    title: string;
    icon: React.ReactNode;
    to: string;
    search?: Record<string, string | undefined>;
    close?: () => void;
    disabled?: boolean;
}

const Link = ({ title, icon, to, search, close, disabled }: LinkProps) => (
    <RouterLink
        className={cn(
            "flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-primary-foreground transition-colors",
            !disabled &&
                "hover:bg-foreground/10 focus-visible:bg-foreground/10 dark:hover:bg-card-foreground/5 dark:focus-visible:bg-card-foreground/5 [&.active]:bg-foreground/20 [&.active]:dark:bg-card-foreground/10",
            disabled && "cursor-not-allowed opacity-50"
        )}
        to={to}
        search={search}
        onClick={close}
    >
        {icon}
        {title}
    </RouterLink>
);

const ThemeSwitcher = () => {
    const { theme, isSystem, changeTheme } = useContext(ThemeContext);

    return (
        <Select onValueChange={changeTheme} defaultValue={isSystem ? "system" : theme ?? "system"}>
            <SelectTrigger
                className={`
                    border-none bg-transparent text-primary-foreground
                    hover:bg-foreground/10
                    focus-visible:bg-foreground/10
                    aria-expanded:bg-foreground/10
                    dark:hover:bg-card-foreground/5 dark:focus-visible:bg-card-foreground/5 dark:aria-expanded:bg-card-foreground/5
                `}
            >
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">
                    <div className="flex items-center gap-x-3">
                        <Sun size={16} /> Light
                    </div>
                </SelectItem>
                <SelectItem value="dark">
                    <div className="flex items-center gap-x-3">
                        <Moon size={16} /> Dark
                    </div>
                </SelectItem>
                <SelectItem value="system">
                    <div className="flex items-center gap-x-3">
                        <Monitor size={16} /> System
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    );
};

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { user } = useContext(UserContext);

    const signOutHandler = useSignOut();

    const links = [
        { title: "Home", icon: <Home size={16} />, to: "/" },
        {
            title: "Notes",
            icon: <StickyNote size={16} />,
            to: "/notes",
            search: { sort: "title", order: "ascending", searchBy: "title" },
        },
        {
            title: "Folders",
            icon: <Folder size={16} />,
            to: "/folders",
            disabled: !user,
            search: { sort: "name", order: "ascending" },
        },
        {
            title: "Archive",
            icon: <Archive size={16} />,
            to: "/archive",
            disabled: !user,
            search: { sort: "title", order: "ascending", searchBy: "title" },
        },
        {
            title: "Bin",
            icon: <Trash size={16} />,
            to: "/bin",
            disabled: !user,
            search: { sort: "title", order: "ascending", searchBy: "title" },
        },
    ] satisfies LinkProps[];

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
                    dark:bg-card
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
                            <li key={link.to}>
                                <Link {...link} close={() => setIsExpanded(false)} />
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col gap-4">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className={cn(`
                                                flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-primary-foreground transition-colors hover:bg-foreground/10 focus-visible:bg-foreground/10 aria-expanded:bg-foreground/10 dark:hover:bg-foreground/5 dark:focus-visible:bg-foreground/5
                                                dark:aria-expanded:bg-foreground/5
                                            `)}
                                >
                                    <User size={16} /> Account
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel className="text-xs">{user.email}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <RouterLink to="/settings/general" onClick={() => setIsExpanded(false)}>
                                            Settings
                                        </RouterLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => signOutHandler.mutate()}>
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link
                                title="Sign In"
                                icon={<LogIn size={16} />}
                                to="/auth/sign_in"
                                close={() => setIsExpanded(false)}
                            />
                        )}
                        <ThemeSwitcher />
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
