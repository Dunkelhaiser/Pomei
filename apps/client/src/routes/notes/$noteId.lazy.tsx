import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/notes/$noteId")({
    component: () => <div>Hello /notes/$noteId!</div>,
});
