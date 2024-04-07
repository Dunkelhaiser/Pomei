import { forwardRef } from "react";
import { cn } from "@/utils/utils";

const Section = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <section ref={ref} className={cn("flex flex-1 flex-col gap-4", className)} {...props} />
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

const SectionSubHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("mx-auto w-full max-w-6xl text-xl font-semibold", className)} {...props}>
            {props.children}
        </div>
    )
);
SectionSubHeader.displayName = "SectionSubHeader";

const SectionContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("mx-auto mt-2 w-full max-w-6xl md:mt-4", className)} {...props} />
    )
);
SectionContent.displayName = "SectionContent";

export { Section, SectionHeader, SectionSubHeader, SectionContent };
