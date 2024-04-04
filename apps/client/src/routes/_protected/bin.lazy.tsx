import { createLazyFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/ui/Section";

const Page = () => (
    <Section>
        <SectionHeader>Bin</SectionHeader>
    </Section>
);

export const Route = createLazyFileRoute("/_protected/bin")({
    component: Page,
});
