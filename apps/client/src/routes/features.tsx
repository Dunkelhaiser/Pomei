import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "@/api/auth/requests";
import FeatureCard from "@/components/FeatureCard";

const Page = () => {
    return (
        <section
            className={`
                mx-auto max-w-[85rem] px-4 py-10
                sm:px-6
                lg:px-8 lg:py-14
            `}
        >
            <div
                className={`
                    mx-auto mb-10 max-w-2xl text-center
                    lg:mb-14
                `}
            >
                <h2
                    className={`
                        text-2xl font-bold
                        md:text-4xl md:leading-tight
                    `}
                >
                    Modes
                </h2>
                <p className="mt-1 text-muted-foreground">Choose the preferred way of using Pomei notes app.</p>
            </div>

            <section
                className={`
                    mt-12 grid gap-6
                    sm:grid-cols-2
                `}
            >
                <FeatureCard
                    mode="Local"
                    price="Free"
                    link={{ to: "/", title: "Stay Local" }}
                    features={["Notes management", "Advanced search and filtration", "Local storage", "Dark mode"]}
                />
                <FeatureCard
                    mode="Account"
                    price="Free"
                    link={{ to: "/auth/sign_up", title: "Sign Up" }}
                    features={[
                        "Everything in local mode",
                        "Folders",
                        "Sync across devices",
                        "Archive",
                        "Notes tagging",
                        "Bin",
                    ]}
                />
            </section>
        </section>
    );
};

export const Route = createFileRoute("/features")({
    component: Page,
    beforeLoad: async () => {
        const authenticated = await isAuthenticated();
        if (authenticated) {
            throw redirect({
                to: "/",
            });
        }
    },
});
