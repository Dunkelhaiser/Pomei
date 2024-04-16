/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { cn } from "@udecode/cn";
import { createNodeHOC, createNodesHOC, PlaceholderProps, usePlaceholderState } from "@udecode/plate-common";
import { ELEMENT_H1 } from "@udecode/plate-heading";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import React from "react";

export const Placeholder = (props: PlaceholderProps) => {
    const { children, placeholder, nodeProps } = props;

    const { enabled } = usePlaceholderState(props);

    return React.Children.map(children, (child) => {
        return React.cloneElement(child, {
            className: child.props.className,
            nodeProps: {
                ...nodeProps,
                className: cn(
                    enabled && "before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]"
                ),
                placeholder,
            },
        });
    });
};

export const withPlaceholder = createNodeHOC(Placeholder);
export const withPlaceholdersPrimitive = createNodesHOC(Placeholder);

export const withPlaceholders = (components: any) =>
    withPlaceholdersPrimitive(components, [
        {
            key: ELEMENT_PARAGRAPH,
            placeholder: "",
            hideOnBlur: true,
            query: {
                maxLevel: 1,
            },
        },
        {
            key: ELEMENT_H1,
            placeholder: "Untitled",
            hideOnBlur: false,
        },
    ]);
