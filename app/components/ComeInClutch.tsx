import React from "react";
import SoftScenarioPanel from "./ScenarioPanel";

const scenarioCards = [
    {
        id: "clear-focus",
        type: "FOCUS & CLARITY",
        icon: "Zap",
        title: {
            main: "SHARP",
            highlight: "FOCUS",
        },
        description:
            "Enhance your mental clarity and attention for peak performance.",
        highlightText: [
            "Sustained focus when it counts.",
            "Mental clarity without jitters.",
            "Stay in control of your day."
        ],
        image: "/images/work-mode.jpg",
        stat: {
            icon: "Clock",
            text: "Long-lasting effect",
        },
        ctaText: "LEVEL UP",
    },
    {
        id: "positive-mood",
        type: "SOCIAL ENERGY",
        icon: "Users",
        title: {
            main: "SOCIAL",
            highlight: "DRIVE",
        },
        description: "Boost your confidence and conversational energy in any setting.",
        highlightText: [
            "Enhanced social confidence.",
            "Sharper wit and presence.",
            "Command any room with ease."
        ],
        image: "/images/social-scene.jpg",
        stat: {
            icon: "Heart",
            text: "Immediate impact",
        },
        ctaText: "STAND OUT",
    },
    {
        id: "creative-thinking",
        type: "CREATIVE POWER",
        icon: "Lightbulb",
        title: {
            main: "BREAK",
            highlight: "THROUGH",
        },
        description:
            "Unlock new perspectives and ideas when you need them most.",
        highlightText: [
            "Overcome creative blocks.",
            "See challenges differently.",
            "Transform how you think."
        ],
        image: "/images/creative-flow.jpg",
        stat: {
            icon: "Brain",
            text: "Cognitive enhancement",
        },
        ctaText: "CREATE MORE",
    },
    {
        id: "balanced-moment",
        type: "PERFORMANCE SHIFT",
        icon: "Sunset",
        title: {
            main: "SEAMLESS",
            highlight: "SHIFT",
        },
        description:
            "Transition between states of mind without missing a beat.",
        highlightText: [
            "Switch modes effortlessly.",
            "No crash, just controlled transition.",
            "Adapt to any situation quickly."
        ],
        image: "/images/recovery-mode.jpg",
        stat: {
            icon: "RefreshCw",
            text: "Adaptive support",
        },
        ctaText: "TRANSFORM",
    },
];

const ComeInClutchSection = () => {
    return (
        <div className="container px-4 flex flex-col items-center bg-neutral-900 py-16">
            {/* Section Header */}
            <div className="text-center mb-10 flex flex-col items-center">
                <h2 className="text-6xl md:text-8xl font-black mb-4 !text-[124px]">
                    <span className="text-white">COME IN</span>
                    <span className="text-red-600">CLUTCH</span>
                </h2>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-center text-gray-400">
                    With Bevvy, there is no line between fun and performance.
                    
                </p>
            </div>

            {/* Horizontally scrollable scenario panels */}
            <div className="w-full overflow-x-auto pb-4">
                <div className="flex flex-row gap-4 md:gap-8 snap-x snap-mandatory w-fit">
                    {scenarioCards.map((card, index) => (
                        <div key={card.id} className="snap-center">
                            <SoftScenarioPanel
                                icon={card.icon}
                                title={card.title.main}
                                highlight={card.title.highlight}
                                description={card.description}
                                highlightText={card.highlightText}
                                stat={card.stat}
                                ctaText={card.ctaText}
                                image={card.image}
                                onClick={() => console.log(`Panel ${card.id} clicked`)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComeInClutchSection;
