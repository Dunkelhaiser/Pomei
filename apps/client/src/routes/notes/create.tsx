import { createFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";

const Page = () => {
    return (
        <div>
            <Helmet>
                <title>Pomei - New Note</title>
            </Helmet>
            Hello /notes/create!
        </div>
    );
};

export const Route = createFileRoute("/notes/create")({
    component: Page,
});
