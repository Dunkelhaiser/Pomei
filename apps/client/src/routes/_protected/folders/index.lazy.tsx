import { createLazyFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/ui/Section";

const Page = () => (
    <Section>
        <SectionHeader>Folders</SectionHeader>
    </Section>
);

export const Route = createLazyFileRoute("/_protected/folders/")({
    component: Page,
});
