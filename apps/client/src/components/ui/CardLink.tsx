// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Cloudflare Pages fails build with this file

import { Link, RegisteredRouter, LinkOptions } from "@tanstack/react-router";
import { forwardRef } from "react";
import { Card } from "./Card";
import { cn } from "@/utils/utils";

const CardLink = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    return (
        <Card
            ref={ref}
            className={cn(
                `
                    group relative flex max-w-full translate-y-0 scroll-p-6 flex-col ring-accent-foreground ring-offset-background transition duration-300
                    hover:translate-y-[-1.5px]
                    focus-visible:translate-y-[-1.5px]
                    group-focus-visible:translate-y-[-1.5px]
                    has-[a:focus-visible]:translate-y-[-1.5px]
                    has-[button:focus-visible]:translate-y-[-1.5px]
                    has-[a:focus-visible]:ring-2
                    has-[button:focus-visible]:ring-2
                    has-[a:focus-visible]:ring-offset-0
                    has-[button:focus-visible]:ring-offset-0
                `,
                className
            )}
            {...props}
        />
    );
});
CardLink.displayName = "CardLink";

const CardLinkAnchor = <TTo extends string = ".">(
    props: LinkOptions<RegisteredRouter["routeTree"], "/", TTo> &
        React.RefAttributes<HTMLAnchorElement> & { children: React.ReactNode; className?: string }
) => {
    return (
        <Link
            {...props}
            className={cn(
                `
                line-clamp-1 outline-none
                after:absolute after:inset-0 after:content-['']
            `,
                props.className
            )}
        />
    );
};
export { CardLink, CardLinkAnchor };
