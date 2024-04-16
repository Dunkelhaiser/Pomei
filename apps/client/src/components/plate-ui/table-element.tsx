import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { cn, withRef } from "@udecode/cn";
import {
    isSelectionExpanded,
    PlateElement,
    useEditorRef,
    useEditorSelector,
    useElement,
    useRemoveNodeButton,
    withHOC,
} from "@udecode/plate-common";
import {
    mergeTableCells,
    TableProvider,
    TTableElement,
    unmergeTableCells,
    useTableBordersDropdownMenuContentState,
    useTableElement,
    useTableElementState,
    useTableMergeState,
} from "@udecode/plate-table";
import {
    ArrowDownToLine,
    ArrowLeftToLine,
    ArrowRightToLine,
    ArrowUpToLine,
    BoxSelect,
    Group,
    Square,
    Ungroup,
    X,
} from "lucide-react";
import { useReadOnly, useSelected } from "slate-react";

import { Button } from "./button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuPortal,
    DropdownMenuTrigger,
} from "./dropdown-menu";
import { Popover, PopoverContent, popoverVariants } from "./popover";
import { Separator } from "./separator";

export const TableBordersDropdownMenuContent = withRef<typeof DropdownMenuPrimitive.Content>((props, ref) => {
    const {
        getOnSelectTableBorder,
        hasOuterBorders,
        hasBottomBorder,
        hasLeftBorder,
        hasNoBorders,
        hasRightBorder,
        hasTopBorder,
    } = useTableBordersDropdownMenuContentState();

    return (
        <DropdownMenuContent
            ref={ref}
            className={cn("min-w-[220px]")}
            side="right"
            align="start"
            sideOffset={0}
            {...props}
        >
            <DropdownMenuCheckboxItem checked={hasBottomBorder} onCheckedChange={getOnSelectTableBorder("bottom")}>
                <ArrowDownToLine size={16} />
                <div>Bottom Border</div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={hasTopBorder} onCheckedChange={getOnSelectTableBorder("top")}>
                <ArrowUpToLine size={16} />
                <div>Top Border</div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={hasLeftBorder} onCheckedChange={getOnSelectTableBorder("left")}>
                <ArrowLeftToLine size={16} />
                <div>Left Border</div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={hasRightBorder} onCheckedChange={getOnSelectTableBorder("right")}>
                <ArrowRightToLine size={16} />
                <div>Right Border</div>
            </DropdownMenuCheckboxItem>

            <Separator />

            <DropdownMenuCheckboxItem checked={hasNoBorders} onCheckedChange={getOnSelectTableBorder("none")}>
                <BoxSelect size={16} />
                <div>No Border</div>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={hasOuterBorders} onCheckedChange={getOnSelectTableBorder("outer")}>
                <Square size={16} />
                <div>Outside Borders</div>
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    );
});

export const TableFloatingToolbar = withRef<typeof PopoverContent>(({ children, ...props }, ref) => {
    const element = useElement<TTableElement>();
    const { props: buttonProps } = useRemoveNodeButton({ element });

    const selectionCollapsed = useEditorSelector((editor) => !isSelectionExpanded(editor), []);

    const readOnly = useReadOnly();
    const selected = useSelected();
    const editor = useEditorRef();

    const collapsed = !readOnly && selected && selectionCollapsed;
    const open = !readOnly && selected;

    const { canMerge, canUnmerge } = useTableMergeState();

    const mergeContent = canMerge && (
        <Button contentEditable={false} variant="ghost" isMenu onClick={() => mergeTableCells(editor)}>
            <Group className="mr-2" size={16} />
            Merge
        </Button>
    );

    const unmergeButton = canUnmerge && (
        <Button contentEditable={false} variant="ghost" isMenu onClick={() => unmergeTableCells(editor)}>
            <Ungroup className="mr-2" size={16} />
            Unmerge
        </Button>
    );

    const bordersContent = collapsed && (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" isMenu>
                        <Square className="mr-2" size={16} />
                        Borders
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuPortal>
                    <TableBordersDropdownMenuContent />
                </DropdownMenuPortal>
            </DropdownMenu>

            <Button contentEditable={false} variant="ghost" isMenu {...buttonProps}>
                <X className="mr-2" size={16} />
                Delete
            </Button>
        </>
    );

    return (
        <Popover open={open} modal={false}>
            <PopoverAnchor asChild>{children}</PopoverAnchor>
            {(canMerge || canUnmerge || collapsed) && (
                <PopoverContent
                    ref={ref}
                    className={cn(popoverVariants(), "flex w-[220px] flex-col gap-1 p-1")}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    {...props}
                >
                    {unmergeButton}
                    {mergeContent}
                    {bordersContent}
                </PopoverContent>
            )}
        </Popover>
    );
});

export const TableElement = withHOC(
    TableProvider,
    withRef<typeof PlateElement>(({ className, children, ...props }, ref) => {
        const { colSizes, isSelectingCell, minColumnWidth, marginLeft } = useTableElementState();
        const { props: tableProps, colGroupProps } = useTableElement();

        return (
            <TableFloatingToolbar>
                <div style={{ paddingLeft: marginLeft }}>
                    <PlateElement
                        ref={ref}
                        asChild
                        className={cn(
                            "my-4 ml-px mr-0 table h-px w-full table-fixed border-collapse",
                            isSelectingCell && "[&_*::selection]:bg-none",
                            className
                        )}
                        {...tableProps}
                        {...props}
                    >
                        <table>
                            <colgroup {...colGroupProps}>
                                {colSizes.map((width, index) => (
                                    <col
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={index}
                                        style={{
                                            minWidth: minColumnWidth,
                                            width: width || undefined,
                                        }}
                                    />
                                ))}
                            </colgroup>

                            <tbody className="min-w-full">{children}</tbody>
                        </table>
                    </PlateElement>
                </div>
            </TableFloatingToolbar>
        );
    })
);
