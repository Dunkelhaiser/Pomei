import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import Button from "./ui/Button";

interface Props {
    mode: string;
    link: { to: string; title: string };
    features: string[];
    price: string;
}

const FeatureCard = ({ mode, link, features, price }: Props) => {
    return (
        <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-8 text-center text-card-foreground">
            <h2 className="text-lg font-medium">{mode}</h2>
            <span className="text-5xl font-bold">{price}</span>

            <div
                className={`
                    mt-2 grid w-full justify-between gap-2.5 text-sm
                    sm:grid-cols-2 sm:gap-2
                `}
            >
                <ul className="space-y-2.5">
                    {features.map(
                        (feature, i) =>
                            i % 2 === 0 && (
                                <li key={feature} className="flex gap-2">
                                    <Check size={16} className="mt-0.5 min-w-4 text-primary" />
                                    <span className="text-left">{feature}</span>
                                </li>
                            )
                    )}
                </ul>
                <ul className="space-y-2.5">
                    {features.map(
                        (feature, i) =>
                            i % 2 !== 0 && (
                                <li key={feature} className="flex gap-2">
                                    <Check size={16} className="mt-0.5 min-w-4 text-primary" />
                                    <span className="text-left">{feature}</span>
                                </li>
                            )
                    )}
                </ul>
            </div>

            <Button asChild className="mt-auto">
                <Link to={link.to}>{link.title}</Link>
            </Button>
        </div>
    );
};

export default FeatureCard;
