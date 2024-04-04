import { forwardRef } from "react";
import { cn } from "@/utils/utils";

const Section = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <section ref={ref} className={cn("flex flex-1 flex-col gap-4 md:gap-8", className)} {...props} />
));
Section.displayName = "Section";

const SectionHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <h1 ref={ref} className={cn("mx-auto w-full max-w-6xl text-3xl font-semibold", className)} {...props}>
            {props.children}
        </h1>
    )
);
SectionHeader.displayName = "SectionHeader";

const SectionContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => <div ref={ref} className={cn("mx-auto w-full max-w-6xl", className)} {...props} />
);
SectionContent.displayName = "SectionContent";

export { Section, SectionHeader, SectionContent };
