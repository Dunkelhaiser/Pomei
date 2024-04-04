import { createLazyFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/ui/Section";

const Page = () => (
    <Section>
        <SectionHeader>Home</SectionHeader>
    </Section>
);

export const Route = createLazyFileRoute("/")({
    component: Page,
});
