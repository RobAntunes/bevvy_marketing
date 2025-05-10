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
        badge: "Socialize",
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
        <div className="container px-4 flex flex-col items-center bg-neutral-900 py-16 pt-12">
            {/* Section Header */}
            <div className="text-center mb-10 flex flex-col items-center">
                <h2 className="text-6xl md:text-8xl font-black mb-4 !text-[124px]">
                    <span className="text-white">COME IN</span>
                    <span className="text-red-600">CLUTCH</span>
                </h2>
                <p className="!text-2xl md:text-xl max-w-2xl mx-auto text-center text-gray-400">
                    With Bevvy, there is no line between fun and performance.
                </p>
                <p className="!text-2xl md:text-xl max-w-2xl mx-auto text-center text-[#FF8181]">
                    Go from zero to hero when it matters most.
                </p>
            </div>

            {/* Horizontally scrollable scenario panels */}
            <div className="w-full pb-4 h-full flex justify-center items-center">
                <div className="flex flex-row w-fit h-full">
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
        </div>
    );
};

export default ComeInClutchSection;
