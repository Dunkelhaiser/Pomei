import { withRef, withVariants } from "@udecode/cn";
import { PlateElement } from "@udecode/plate-common";
import { cva } from "class-variance-authority";

const headingVariants = cva("", {
    variants: {
        variant: {
            h1: "mb-1 mt-[1em] text-4xl font-bold",
            h2: "mb-px mt-[0.5em] text-2xl font-semibold tracking-tight",
            h3: "mb-px mt-[0.35em] text-xl font-semibold tracking-tight",
            h4: "mt-[0.25em] text-lg font-semibold tracking-tight",
            h5: "mt-[0.25em] text-lg font-semibold tracking-tight",
            h6: "mt-[0.25em] text-base font-semibold tracking-tight",
        },
        isFirstBlock: {
            true: "mt-0",
            false: "",
        },
    },
});

const HeadingElementVariants = withVariants(PlateElement, headingVariants, ["isFirstBlock", "variant"]);

export const HeadingElement = withRef<typeof HeadingElementVariants>(({ variant = "h1", children, ...props }, ref) => {
    const { element, editor } = props;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const Element = variant!;

    return (
        <HeadingElementVariants
            ref={ref}
            asChild
            variant={variant}
            isFirstBlock={element === editor.children[0]}
            {...props}
        >
            <Element>{children}</Element>
        </HeadingElementVariants>
    );
});
