import { createLazyFileRoute } from "@tanstack/react-router";

const Page = () => <div>Hello /!</div>;

export const Route = createLazyFileRoute("/")({
    component: Page,
});
