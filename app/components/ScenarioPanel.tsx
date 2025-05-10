import React from "react";
import { LucideIcon, Zap, Users, Lightbulb, Sunset, Clock, Heart, Brain, RefreshCw } from "lucide-react";

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
    title: string;
    highlight: string;
    description: string;
    highlightText: string[];
    stat: { icon: string; text: string };
    ctaText: string;
    image?: string;
    onClick?: () => void;
}

const SoftScenarioPanel: React.FC<SoftScenarioPanelProps> = ({
    icon,
    title,
    highlight,
    description,
    highlightText,
    stat,
    ctaText,
    image,
    onClick,
}) => {
    const Icon = IconMap[icon] || Zap;
    const StatIcon = IconMap[stat.icon] || Clock;
    return (
        <div className="flex flex-col justify-between h-max bg-black border-2 border-black rounded-md shadow-md overflow-hidden min-w-[300px] max-w-xs mx-4 my-6 transition-all duration-300 hover:border-red-600 hover:shadow-lg relative">
            {/* Two-layer system visualization */}
            <div
                className="absolute bottom-0 left-0 right-0 z-0"
                style={{
                    height: "120px",
                    background: "#ff0000",
                    clipPath: "polygon(0 40%, 100% 20%, 100% 100%, 0 100%)",
                }}
            />

            <div
                className="absolute bottom-0 left-0 right-0 z-0"
                style={{
                    height: "80px",
                    background: "#ff8181",
                    clipPath: "polygon(0 50%, 100% 40%, 100% 100%, 0 100%)",
                }}
            />

            <div className="flex flex-col justify-between h-full z-10 p-6 text-white">
                {/* Top Badge */}
                <div className="bg-white text-black text-xs font-bold uppercase tracking-widest py-1 px-3 self-start mb-4 flex items-center">
                    <Icon size={12} className="mr-1 text-red-600" />
                    <span>{title}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white">
                    {title} <span className="text-red-600">{highlight}</span>
                </h3>

                {/* Description */}
                <p className="text-gray-300 my-3">{description}</p>

                {/* Bullet Points */}
                <ul className="mb-4">
                    {highlightText.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-red-400 text-sm mb-2">
                            <span className="text-white">•</span>
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>

                {/* Bottom Stat */}
                <div className="mt-auto pt-4">
                    <div className="flex items-center text-xs text-gray-400 mb-4">
                        <StatIcon size={16} className="mr-2 text-red-400" />
                        <span>{stat.text}</span>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={onClick}
                        className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold transition-all duration-300 bg-red-600 hover:bg-red-500 text-white border border-white"
                    >
                        <span>{ctaText}</span>
                        <span className="ml-2">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SoftScenarioPanel; 