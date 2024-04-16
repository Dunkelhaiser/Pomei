import { createFileRoute } from "@tanstack/react-router";

const Page = () => {
    return <div>Hello /notes/create!</div>;
};

export const Route = createFileRoute("/notes/create")({
    component: Page,
});
