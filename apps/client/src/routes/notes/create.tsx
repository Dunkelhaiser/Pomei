import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import Editor from "@/components/Editor";
import Input from "@/ui/Input";

const Page = () => {
    return (
        <div>
            <Helmet>
                <title>Pomei - New Note</title>
            </Helmet>
            <Input className="mb-4 bg-card px-4 py-5 text-2xl text-card-foreground" placeholder="Title" />
            <Editor />
        </div>
    );
};

export const Route = createFileRoute("/notes/create")({
    component: Page,
});
