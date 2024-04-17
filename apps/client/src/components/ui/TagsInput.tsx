import { X } from "lucide-react";
import React, { forwardRef } from "react";
import Badge from "./Badge";
import { cn } from "@/utils/utils";

interface Props {
    className?: string;
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagsInput = forwardRef<HTMLInputElement, Props>(({ className, tags, setTags }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> & React.ChangeEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && e.target.value === "") {
            setTags(tags.slice(0, -1));
            return;
        }

        if (e.key !== "Enter") return;
        const { value } = e.target;
        if (!value.trim()) return;
        setTags((prev) => [...prev, value]);
        e.target.value = "";
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_el, i) => i !== index));
    };

    return (
        <div
            className={cn(
                `
                    flex h-10 w-full gap-1
                    rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background transition file:border-0 file:bg-transparent file:text-sm file:font-medium
                    placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 
                    has-[input:focus-visible]:outline-none has-[input:focus-visible]:ring-2
                    has-[input:focus-visible]:ring-accent-foreground has-[input:focus-visible]:ring-offset-0
                `,
                className
            )}
            ref={ref}
        >
            {tags.map((tag, i) => (
                <Badge className="flex items-center gap-1" variant="secondary" key={tag}>
                    {tag}
                    <button type="button" onClick={() => removeTag(i)}>
                        <X size={12} />
                    </button>
                </Badge>
            ))}
            <input
                type="text"
                className="ml-2 grow bg-transparent outline-none"
                placeholder="Add tags..."
                onKeyDown={handleKeyDown}
            />
        </div>
    );
});
TagsInput.displayName = "TagsInput";

export default TagsInput;
