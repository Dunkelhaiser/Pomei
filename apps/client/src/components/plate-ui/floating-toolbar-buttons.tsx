import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_UNDERLINE } from "@udecode/plate-basic-marks";
import { useEditorReadOnly } from "@udecode/plate-common";
import { Bold, Code, Italic, Strikethrough, Underline } from "lucide-react";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { MoreDropdownMenu } from "./more-dropdown-menu";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";

export const FloatingToolbarButtons = () => {
    const readOnly = useEditorReadOnly();

    return (
        <>
            {!readOnly && (
                <>
                    <TurnIntoDropdownMenu />

                    <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (Ctrl+B)">
                        <Bold size={16} />
                    </MarkToolbarButton>
                    <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italic (Ctrl+I)">
                        <Italic size={16} />
                    </MarkToolbarButton>
                    <MarkToolbarButton nodeType={MARK_UNDERLINE} tooltip="Underline (Ctrl+U)">
                        <Underline size={16} />
                    </MarkToolbarButton>
                    <MarkToolbarButton nodeType={MARK_STRIKETHROUGH} tooltip="Strikethrough (Ctrl+Shift+M)">
                        <Strikethrough size={16} />
                    </MarkToolbarButton>
                    <MarkToolbarButton nodeType={MARK_CODE} tooltip="Code (Ctrl+E)">
                        <Code size={16} />
                    </MarkToolbarButton>
                </>
            )}

            <MoreDropdownMenu />
        </>
    );
};
