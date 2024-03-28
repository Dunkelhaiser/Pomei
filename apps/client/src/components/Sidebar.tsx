import { Archive, Folder, Home, LogIn, Menu, StickyNote, Trash } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/utils";

interface LinkProps {
    title: string;
    icon: React.ReactNode;
    href: string;
    isActive?: boolean;
}

const Link = ({ title, icon, href, isActive = false }: LinkProps) => (
    <a
        className={cn(`
            flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm text-primary-foreground transition-colors
            ${isActive ? "bg-slate-950/20 dark:bg-slate-500/15" : "hover:bg-slate-950/10 dark:hover:bg-slate-500/10"}
        `)}
        href={href}
    >
        {icon}
        {title}
    </a>
);

const links = [
    { title: "Home", icon: <Home size={16} />, href: "#", isActive: true },
    { title: "Notes", icon: <StickyNote size={16} />, href: "#" },
    { title: "Folders", icon: <Folder size={16} />, href: "#" },
    { title: "Archive", icon: <Archive size={16} />, href: "#" },
    { title: "Bin", icon: <Trash size={16} />, href: "#" },
];

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
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
                <a href="#" className="px-6">
                    <img src="logo.svg" className="rounded-lg bg-primary-foreground p-3" alt="Pomei Logo" />
                </a>

                <nav className="flex w-full grow flex-col justify-between p-6">
                    <ul className="space-y-2">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link {...link} />
                            </li>
                        ))}
                    </ul>
                    <Link title="Sign In" icon={<LogIn size={16} />} href="#" />
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
