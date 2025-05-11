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
    stat: { icon: string; text: string };
    ctaText: string;
    onClick?: () => void;
}

const ScenarioPanel: React.FC<SoftScenarioPanelProps> = ({
    icon,
    badge,
    title,
    description,
    stat,
    ctaText,
    onClick,
}) => {
    const Icon = IconMap[icon] || Zap;
    const StatIcon = IconMap[stat.icon] || Clock;
    return (
        <div className="flex flex-col rounded-xl bg-black border-2 border-black shadow-md my-2 md:my-0 w-full transition-all duration-300 hover:border-red-600 hover:shadow-lg relative overflow-hidden min-h-[400px] sm:min-h-[420px] md:min-h-[450px]">
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

            <div className="flex flex-col flex-grow h-full z-10 p-4 sm:p-6 text-white">
                {/* Top Badge */}
                <div className="bg-white text-black rounded-full text-xs font-bold tracking-widest py-1 px-3 sm:px-4 self-start mb-3 sm:mb-4 md:mb-5 flex items-center">
                    <Icon size={16} className="mr-1 sm:mr-2 text-red-600" />
                    <span>{badge}</span>
                </div>

                {/* Stats under badge */}
                <div className="flex items-center text-xs sm:text-sm text-gray-300 mb-4 sm:mb-5 md:mb-6">
                    <StatIcon size={18} className="mr-1 sm:mr-2 text-red-400" />
                    <span>{stat.text}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold mb-3 sm:mb-4">
                    <span className="text-white">{title.main}</span>{" "}
                    <span className="text-red-600">{title.highlight}</span>
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm sm:text-base flex-grow mb-4 sm:mb-6">{description}</p>

                {/* Bottom area with button */}
                <div className="mt-auto mb-0 sm:mb-2 md:mb-0">
                    <a
                        href="/collections/shop"
                        onClick={onClick}
                        className="rounded-md hover:cursor-pointer !text-white border-white border shadow-md z-20 relative bg-red-600 hover:bg-red-500 font-bold py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base transition-all duration-300 flex items-center justify-center w-full sm:w-auto self-center sm:self-start"
                    >
                        <span>{ctaText}</span>
                        <ChevronRight size={18} className="ml-1 sm:ml-2" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ScenarioPanel;
