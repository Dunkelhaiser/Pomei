import { createLazyFileRoute } from "@tanstack/react-router";
import Folder from "@/components/Folder";
import { Section, SectionContent, SectionHeader } from "@/ui/Section";

const Page = () => (
    <Section>
        <SectionHeader>Folders</SectionHeader>
        <SectionContent
            className={`
                grid min-h-24 grid-cols-1 items-start gap-4
                md:grid-cols-2
                xl:grid-cols-4
            `}
        >
            <Folder
                folder={{
                    id: "string",
                    name: "Folder",
                    color: "#446b8d",
                    order: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }}
            />
        </SectionContent>
    </Section>
);

export const Route = createLazyFileRoute("/_protected/folders/")({
    component: Page,
});
