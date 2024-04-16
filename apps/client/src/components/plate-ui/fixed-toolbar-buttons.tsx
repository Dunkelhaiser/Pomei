import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_UNDERLINE } from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";
import { Bold, Code, Italic, Strikethrough, Underline } from "lucide-react";
import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { MoreDropdownMenu } from "./more-dropdown-menu";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export const FixedToolbarButtons = () => {
    const readOnly = useEditorReadOnly();

    return (
        <div className="w-full overflow-hidden">
            <div
                className="flex flex-wrap"
                style={{
                    transform: "translateX(calc(-1px))",
                }}
            >
                {!readOnly && (
                    <>
                        <ToolbarGroup noSeparator>
                            <InsertDropdownMenu />
                            <TurnIntoDropdownMenu />
                        </ToolbarGroup>

                        <ToolbarGroup>
                            <MarkToolbarButton tooltip="Bold (Ctrl+B)" nodeType={MARK_BOLD}>
                                <Bold size={16} />
                            </MarkToolbarButton>
                            <MarkToolbarButton tooltip="Italic (Ctrl+I)" nodeType={MARK_ITALIC}>
                                <Italic size={16} />
                            </MarkToolbarButton>
                            <MarkToolbarButton tooltip="Underline (Ctrl+U)" nodeType={MARK_UNDERLINE}>
                                <Underline size={16} />
                            </MarkToolbarButton>
                            <MarkToolbarButton tooltip="Strikethrough (Ctrl+Shift+M)" nodeType={MARK_STRIKETHROUGH}>
                                <Strikethrough size={16} />
                            </MarkToolbarButton>
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <MarkToolbarButton tooltip="Code (Ctrl+E)" nodeType={MARK_CODE}>
                                <Code size={16} />
                            </MarkToolbarButton>
                        </ToolbarGroup>
                        <MoreDropdownMenu />
                    </>
                )}
            </div>
        </div>
    );
};
