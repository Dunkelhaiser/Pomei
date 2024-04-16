import { cn, withRef } from "@udecode/cn";
import { PlateElement, useElement } from "@udecode/plate-common";
import { TLinkElement, useLink } from "@udecode/plate-link";

export const LinkElement = withRef<typeof PlateElement>(({ className, children, ...props }, ref) => {
    const element = useElement<TLinkElement>();
    const { props: linkProps } = useLink({ element });

    return (
        <PlateElement
            ref={ref}
            asChild
            className={cn("font-medium text-primary underline decoration-primary underline-offset-4", className)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(linkProps as any)}
            {...props}
        >
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <a>{children}</a>
        </PlateElement>
    );
});
