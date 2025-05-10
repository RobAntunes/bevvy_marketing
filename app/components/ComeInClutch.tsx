import React, { useState } from "react";
import ScenarioCard from "./ScenarioCard";

const scenarioCards = [
    {
        id: "deadline-crusher",
        type: "Work",
        icon: "Zap",
        title: {
            main: "Deadline",
            highlight: "Schmedline",
        },
        description:
            "When that project is due tomorrow but your brain checked out hours ago.",
        highlightText: [
            "3-4 hours of clear-headed focus without jitters or crash.",
            "No sugar, no crash, just pure productivity.",
            "Stay locked in on your most important tasks."
        ],
        image: "/images/work-mode.jpg", // Replace with actual image path
        stat: {
            icon: "Clock",
            text: "3-4 hours of sustained effects",
        },
        ctaText: "Lock in",
    },
    {
        id: "social-butterfly",
        type: "Socialize",
        icon: "Users",
        title: {
            main: "Conversation",
            highlight: "Catalyst",
        },
        description: "For when small talk feels like climbing Everest.",
        highlightText: [
            "Noticeable mood elevation.",
            "Social openness without losing coordination.",
            "Feel at ease in any crowd."
        ],
        image: "/images/social-scene.jpg", // Replace with actual image path
        stat: {
            icon: "Heart",
            text: "Enhanced social confidence",
        },
        ctaText: "Enjoy",
    },
    {
        id: "creative-breakthrough",
        type: "Create",
        icon: "Lightbulb",
        title: {
            main: "Inspiration",
            highlight: "Unlocked",
        },
        description:
            "When the ideas just won't come and the blank page is winning.",
        highlightText: [
            "Enhances creative thinking and perspective.",
            "Break through mental blocks.",
            "Find your flow state faster."
        ],
        image: "/images/creative-flow.jpg", // Replace with actual image path
        stat: {
            icon: "Brain",
            text: "Sustained creative flow state",
        },
        ctaText: "Make",
    },
    {
        id: "recovery-mode",
        type: "Shift",
        icon: "Sunset",
        title: {
            main: "Second",
            highlight: "Wind",
        },
        description:
            "For the days that never end and you need to transition from work to play.",
        highlightText: [
            "Shift from work mode to social butterfly with ease.",
            "No crash, no regrets.",
            "Smooth transition for any occasion."
        ],
        image: "/images/recovery-mode.jpg", // Replace with actual image path
        stat: {
            icon: "RefreshCw",
            text: "Smooth transition without crash",
        },
        ctaText: "Change",
    },
];

const ComeInClutchSection = () => {
    const [activeCardIndex, setActiveCardIndex] = useState(0);

    // Function to handle card navigation
    const nextCard = () => {
        setActiveCardIndex((prev) => (prev + 1) % scenarioCards.length);
    };

    const prevCard = () => {
        setActiveCardIndex((prev) =>
            (prev - 1 + scenarioCards.length) % scenarioCards.length
        );
    };

    // Get current card
    const currentCard = scenarioCards[activeCardIndex];

    return (
        <div className="container px-4 flex flex-col items-center font-sewimple tracking-wide">
            {/* Section Header */}
            <div className="text-center mb-12 flex flex-col items-center">
                <h2 className="!text-[124px] font-bold mb-4 font-sewimple">
                    <span className="text-white">COME IN{" "}</span>
                    <span className="text-[#ff0000]">CLUTCH</span>
                </h2>
                <p className="!text-[24px] max-w-3xl mx-auto text-center">
                    With Bevvy, there is no line between performance and
                    pleasure.
                    <span className="block text-[#ff8181] font-semibold text-center">
                        Go from zero to hero when it matters most.
                    </span>
                </p>
            </div>

            {/* Section Content - Desktop */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
                {scenarioCards.map((card, index) => (
                    <div
                        key={card.id}
                        className="transform hover:-translate-y-2 transition-transform duration-300"
                    >
                        <ScenarioCard
                            type={card.type}
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                            // highlightText={card.highlightText}
                            image={card.image || "/api/placeholder/600/400"}
                            stat={card.stat}
                            ctaText={card.ctaText}
                            onClick={() =>
                                console.log(`Card ${card.id} clicked`)}
                        />
                    </div>
                ))}
            </div>

            {/* Section Content - Mobile (Single Card Slider) */}
            <div className="md:hidden">
                <div className="relative">
                    {/* Mobile navigation buttons */}
                    <button
                        onClick={prevCard}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#ff0000] text-white w-8 h-8 flex items-center justify-center"
                        style={{ left: "-8px" }}
                    >
                        ←
                    </button>

                    <div className="flex justify-center">
                        <ScenarioCard
                            type={currentCard.type}
                            icon={currentCard.icon}
                            title={currentCard.title}
                            description={currentCard.description}
                            highlightText={currentCard.highlightText}
                            image={currentCard.image ||
                                "/api/placeholder/600/400"}
                            stat={currentCard.stat}
                            ctaText={currentCard.ctaText}
                            onClick={() =>
                                console.log(`Card ${currentCard.id} clicked`)}
                        />
                    </div>

                    <button
                        onClick={nextCard}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#ff0000] text-white w-8 h-8 flex items-center justify-center"
                        style={{ right: "-8px" }}
                    >
                        →
                    </button>

                    {/* Indicator dots */}
                    <div className="flex justify-center mt-6 gap-2">
                        {scenarioCards.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveCardIndex(index)}
                                className={`w-2 h-2 rounded-full ${
                                    index === activeCardIndex
                                        ? "bg-[#ff0000]"
                                        : "bg-gray-600"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComeInClutchSection;
