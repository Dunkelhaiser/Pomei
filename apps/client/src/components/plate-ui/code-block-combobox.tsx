import { cn } from "@udecode/cn";
import {
    CODE_BLOCK_LANGUAGES,
    CODE_BLOCK_LANGUAGES_POPULAR,
    useCodeBlockCombobox,
    useCodeBlockComboboxState,
} from "@udecode/plate-code-block";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "./button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const languages: { value: string; label: string }[] = [
    { value: "text", label: "Plain Text" },
    ...Object.entries({
        ...CODE_BLOCK_LANGUAGES_POPULAR,
        ...CODE_BLOCK_LANGUAGES,
    }).map(([key, val]) => ({
        value: key,
        label: val,
    })),
];

export const CodeBlockCombobox = () => {
    const state = useCodeBlockComboboxState();
    const { commandItemProps } = useCodeBlockCombobox(state);

    const [open, setOpen] = useState(false);

    if (state.readOnly) return null;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className="h-5 justify-between px-1 text-xs"
                    size="xs"
                >
                    {state.value ? languages.find((language) => language.value === state.value)?.label : "Plain Text"}
                    {}
                    <ChevronsUpDown className="ml-2 shrink-0 opacity-50" size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>

                    <CommandList>
                        {languages.map((language) => (
                            <CommandItem
                                key={language.value}
                                value={language.value}
                                className="cursor-pointer"
                                onSelect={(_value) => {
                                    commandItemProps.onSelect(_value);
                                    setOpen(false);
                                }}
                            >
                                {}
                                <Check
                                    className={cn("mr-2", state.value === language.value ? "opacity-100" : "opacity-0")}
                                    size={16}
                                />
                                {language.label}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
