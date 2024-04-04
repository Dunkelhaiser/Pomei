import { createLazyFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/ui/Section";

const Page = () => (
    <Section>
        <SectionHeader>Archive</SectionHeader>
    </Section>
);

export const Route = createLazyFileRoute("/_protected/archive")({
    component: Page,
});
