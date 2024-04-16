import { withCn } from "@udecode/cn";
import { Toolbar } from "./toolbar";

export const FixedToolbar = withCn(
    Toolbar,
    "sticky left-0 z-50 w-full justify-between overflow-x-auto rounded-md border-b border-b-border border-[1px] bg-card"
);
