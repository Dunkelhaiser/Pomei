import { createLazyFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/ui/Section";

const Page = () => (
    <Section>
        <SectionHeader>Notes</SectionHeader>
    </Section>
);

export const Route = createLazyFileRoute("/notes/")({
    component: Page,
});
