import React, { useEffect, useState } from "react";
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

// Icon mapping to make dynamic icon rendering possible
const IconMap = {
    Zap,
    Clock,
    Brain,
    Heart,
    Users,
    Lightbulb,
    Sunset,
    RefreshCw,
};

type ScenarioCardProps = {
    type?: string;
    icon?: string;
    title?: { main: string; highlight: string };
    description?: string;
    highlightText: string[];
    image?: string;
    stat?: { icon: string; text: string };
    ctaText?: string;
    onClick?: () => void;
};

const ScenarioCard = ({
    type = "WORK MODE",
    icon = "Zap",
    title = { main: "DEADLINE", highlight: "CRUSHER" },
    description =
        "When that project is due tomorrow but your brain checked out hours ago.",
    highlightText,
    image = "/api/placeholder/600/400",
    stat = { icon: "Clock", text: "3-4 hours of sustained effects" },
    ctaText = "Get it done",
    onClick = () => {},
}: ScenarioCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    // Get icons from mapping
    const TypeIcon = IconMap[icon as keyof typeof IconMap] as LucideIcon;
    const StatIcon = IconMap[stat.icon as keyof typeof IconMap] as LucideIcon;

    // Add shake animation periodically
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isHovered) {
                setIsShaking(true);
                setTimeout(() => setIsShaking(false), 800);
            }
        }, 6000);

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div
            className={`h-full relative overflow-hidden max-w-md mx-auto transition-all duration-300 transform ${
                isHovered ? "scale-102" : ""
            }`}
            style={{
                background: "black",
                border: isHovered ? "2px solid #ff0000" : "2px solid black",
                boxShadow: isHovered
                    ? "0 10px 30px rgba(255, 0, 0, 0.2)"
                    : "none",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Two-layer system visualization */}
            <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                style={{
                    height: isHovered ? "180px" : "120px",
                    background: "#ff0000",
                    clipPath: isHovered
                        ? "polygon(0 30%, 100% 0, 100% 100%, 0 100%)"
                        : "polygon(0 40%, 100% 20%, 100% 100%, 0 100%)",
                }}
            />

            <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-700 delay-100"
                style={{
                    height: isHovered ? "120px" : "80px",
                    background: "#ff8181",
                    clipPath: isHovered
                        ? "polygon(0 40%, 100% 10%, 100% 100%, 0 100%)"
                        : "polygon(0 50%, 100% 40%, 100% 100%, 0 100%)",
                }}
            />

            {/* Card Content */}
            <div className="relative h-full flex flex-col justify-between z-10 p-6 text-white">
                {/* Top Badge */}
                <div className="bg-white text-black text-xs font-bold uppercase tracking-widest py-1 px-3 self-start mb-2 flex items-center">
                    <TypeIcon size={12} className="mr-1 text-[#ff0000]" />
                    <span>{type}</span>
                </div>

                {/* Bottom Stats */}
                <div className="mt-4">
                    <div className="flex items-center text-sm text-white">
                        <StatIcon size={16} className="text-white mr-2" />
                        <span>{stat.text}</span>
                    </div>
                </div>

                {/* Title First */}
                <h3 className="text-3xl font-bold mt-2 mb-4 flex flex-col items-center">
                    <span className="text-white">{title.main}</span>
                    <span className="text-[#ff0000]">{title.highlight}</span>
                </h3>

                {/* Content */}
                <p className="text-white leading-tight text-sm flex flex-col items-center gap-6">
                    {description}
                    {Array.isArray(highlightText) && (
                        <ul className="list-disc list-inside pl-5 mt-2 flex flex-col gap-1 items-start">
                            {(highlightText as string[]).map((point, idx) => (
                                <li
                                    key={idx}
                                    className="font-bold text-[#FF8181] text-left w-full"
                                >
                                    {point}
                                </li>
                            ))}
                        </ul>
                    )}
                </p>
                <div>
                    {/* CTA Button */}
                    <button
                        onClick={onClick}
                        className="shadow-lg border border-[#ffffff] mt-6 w-full flex items-center justify-between px-4 py-2 text-sm font-bold transition-all duration-300 bg-[#ff0000] hover:bg-[#ff8181] text-white"
                    >
                        <span>{ctaText}</span>
                        <ChevronRight
                            size={16}
                            className={`transition-transform duration-300 ${
                                isHovered ? "transform translate-x-1" : ""
                            }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScenarioCard;
