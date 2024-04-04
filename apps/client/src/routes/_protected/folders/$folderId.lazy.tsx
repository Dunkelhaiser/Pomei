import { createLazyFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/ui/Section";

const Page = () => (
    <Section>
        <SectionHeader>Specific Folder</SectionHeader>
    </Section>
);

export const Route = createLazyFileRoute("/_protected/folders/$folderId")({
    component: Page,
});
