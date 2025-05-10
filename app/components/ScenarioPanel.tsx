import React from "react";
import {
    Brain,
    ChevronRight,
    Clock,
    Heart,
    Lightbulb,
    LucideIcon,
    RefreshCw,
    Sunset,
    Users,
    Zap,
} from "lucide-react";

const IconMap: Record<string, LucideIcon> = {
    Zap,
    Users,
    Lightbulb,
    Sunset,
    Clock,
    Heart,
    Brain,
    RefreshCw,
};

interface SoftScenarioPanelProps {
    icon: string;
    badge: string;
    title: {
        main: string;
        highlight: string;
    };
    description: string;
    highlightText: string[];
    stat: { icon: string; text: string };
    ctaText: string;
    image?: string;
    onClick?: () => void;
}

const ScenarioPanel: React.FC<SoftScenarioPanelProps> = ({
    icon,
    badge,
    title,
    description,
    highlightText,
    stat,
    ctaText,
    onClick,
}) => {
    const Icon = IconMap[icon] || Zap;
    const StatIcon = IconMap[stat.icon] || Clock;
    return (
        <div className="rounded-xl bg-black border-2 border-black shadow-md min-w-[320px] max-w-xs mx-4 my-6 transition-all duration-300 hover:border-red-600 hover:shadow-lg relative h-[450px]">
            {/* Two-layer system visualization */}
            <div
                className="absolute bottom-0 left-0 right-0 z-0 rounded-b-xl"
                style={{
                    height: "150px",
                    background: "#e93323",
                    clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)",
                }}
            />

            <div
                className="absolute bottom-0 left-0 right-0 z-0 rounded-b-xl"
                style={{
                    height: "100px",
                    background: "#ff8181",
                    clipPath: "polygon(0 40%, 100% 20%, 100% 100%, 0 100%)",
                }}
            />

            <div className="flex flex-col h-full z-10 p-8 text-white">
                {/* Top Badge */}
                <div className="bg-white text-black rounded-full text-xs font-bold tracking-widest py-1 px-4 self-start mb-5 flex items-center">
                    <Icon size={16} className="mr-2 text-red-600" />
                    <span>{badge}</span>
                </div>

                {/* Stats under badge */}
                <div className="flex items-center text-sm text-gray-300 mb-6">
                    <StatIcon size={18} className="mr-2 text-red-400" />
                    <span>{stat.text}</span>
                </div>

                {/* Title */}
                <h3 className="text-4xl font-bold mb-4">
                    <span className="text-white">{title.main}</span>{" "}
                    <span className="text-red-600">{title.highlight}</span>
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-lg">{description}</p>

                {/* Bottom area with button */}
                <div className="mt-auto mb-4">
                    <button
                        onClick={onClick}
                        className="rounded-md border-white border shadow-md z-50 relative bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-5 transition-all duration-300 flex items-center"
                    >
                        <span>{ctaText}</span>
                        <ChevronRight size={18} className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScenarioPanel;
