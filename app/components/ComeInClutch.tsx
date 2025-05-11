import React from "react";
import SoftScenarioPanel from "./ScenarioPanel";
import ScenarioPanel from "./ScenarioPanel";

const scenarioCards = [
    {
        id: "clear-focus",
        type: "FOCUS & CLARITY",
        icon: "Zap",
        badge: "Focus",
        title: {
            main: "Peak",
            highlight: "Level",
        },
        description:
            "Enhance your mental clarity and attention for peak performance.",
        highlightText: [
            "Sustained focus when it counts.",
            "Mental clarity without jitters.",
            "Stay in control of your day.",
        ],
        image: "/images/work-mode.jpg",
        stat: {
            icon: "Clock",
            text: "Long-lasting effect",
        },
        ctaText: "Level Up",
    },
    {
        id: "positive-mood",
        type: "SOCIAL ENERGY",
        icon: "Users",
        badge: "Social",
        title: {
            main: "Smooth",
            highlight: "Talker",
        },
        description:
            "Boost your mood and give off positive energy.",
        highlightText: [
            "Enhanced social confidence.",
            "Sharper wit and presence.",
            "Command any room with ease.",
        ],
        image: "/images/social-scene.jpg",
        stat: {
            icon: "Heart",
            text: "Immediate impact",
        },
        ctaText: "Stand Out",
    },
    {
        id: "creative-thinking",
        type: "CREATIVE POWER",
        icon: "Lightbulb",
        badge: "Creative",
        title: {
            main: "Flow",
            highlight: "State",
        },
        description:
            "Unlock new perspectives and ideas when you need them most.",
        highlightText: [
            "Overcome creative blocks.",
            "See challenges differently.",
            "Transform how you think.",
        ],
        image: "/images/creative-flow.jpg",
        stat: {
            icon: "Brain",
            text: "Cognitive enhancement",
        },
        ctaText: "Create More",
    },
    {
        id: "balanced-moment",
        type: "PERFORMANCE SHIFT",
        icon: "Sunset",
        badge: "Shift",
        title: {
            main: "Seamless",
            highlight: "Shift",
        },
        description:
            "Transition between states of mind without missing a beat.",
        highlightText: [
            "Switch modes effortlessly.",
            "No crash, just controlled transition.",
            "Adapt to any situation quickly.",
        ],
        image: "/images/recovery-mode.jpg",
        stat: {
            icon: "RefreshCw",
            text: "Adaptive support",
        },
        ctaText: "Transform",
    },
];

const ComeInClutchSection = () => {
    return (
        <div className="container px-4 flex flex-col items-center bg-neutral-900 py-12 md:py-16">
            {/* Section Header - Make header text responsive */}
            <div className="mb-10 md:mb-12 lg:mb-16 flex flex-col items-center">
                <h2 className="!p-6 !text-6xl md:!text-7xl lg:!text-8xl font-black mb-4">
                    <span className="text-white">COME IN </span>
                    <span className="text-red-600">CLUTCH</span>
                </h2>   
                <p className="!text-lg sm:!text-xl md:!text-2xl max-w-xl md:max-w-2xl mx-auto lg:!text-center !text-left text-gray-400 mb-2">
                    With Bevvy, there is no line between fun and performance.
                </p>
                <p className="!text-lg sm:!text-xl md:!text-2xl max-w-xl md:!max-w-2xl mx-auto lg:!text-center !text-left text-[#FF8181]">
                    Go from zero to hero when it matters most.
                </p>
            </div>

            {/* Responsive grid for scenario panels */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-4">
                {scenarioCards.map((card, index) => (
                    <ScenarioPanel
                        key={card.id}
                        icon={card.icon}
                        badge={card.badge as string}
                        title={card.title}
                        description={card.description}
                        highlightText={card.highlightText}
                        stat={card.stat}
                        ctaText={card.ctaText}
                        image={card.image}
                        onClick={() =>
                            console.log(`Panel ${card.id} clicked`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ComeInClutchSection;
