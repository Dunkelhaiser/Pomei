import { cn } from "@/utils/utils";

interface Props {
    className?: string;
}

const Loader = ({ className }: Props) => (
    <div
        className={cn(
            "absolute size-9 animate-spin rounded-full border-2 border-muted-foreground",
            className,
            "border-b-transparent"
        )}
    />
);

export default Loader;
