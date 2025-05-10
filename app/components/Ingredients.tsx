import React, { useEffect, useState } from "react";
import {
    Activity,
    AlertCircle,
    Brain,
    ChevronLeft,
    ChevronRight,
    Coffee,
    Droplets,
    Heart,
    Info,
    Smile,
    Sunrise,
    Zap,
} from "lucide-react";

// --- Types ---
type Ingredient = {
    id: string;
    name: string;
    function: string;
    effect: string;
    icon: JSX.Element;
    description: string;
    source?: string;
};

type Category = {
    id: "stimulation" | "mood" | "support";
    name: string;
    description: string;
    icon: JSX.Element;
    color: string;
};

const PRIMARY_COLOR = "#FF0000";
const SECONDARY_COLOR = "#FF8181";
const CARD_BG = "#18181b";
const CARD_BORDER = "#27272a";
const ACTIVE_BORDER = "#FF0000";
const INACTIVE_BORDER = "#27272a";
const TAG_BG = "#27272a";
const TAG_TEXT = "#fff";
const TAG_ACCENT = "#FF0000";

const BevvyIngredientsExperience = () => {
    const [activeCategory, setActiveCategory] = useState<Category["id"]>(
        "stimulation",
    );
    const [activeIngredient, setActiveIngredient] = useState<string | null>(
        null,
    );
    const [showHarmony, setShowHarmony] = useState(false);

    const categories: Category[] = [
        {
            id: "stimulation",
            name: "Primary Stimulation Complex",
            description:
                "Creates the foundation of mental alertness and clarity",
            icon: <Zap size={24} color="white" />,
            color: "#4C6FFF",
        },
        {
            id: "mood",
            name: "Mood Modulation System",
            description: "Stimulates a positive feeling and outlook",
            icon: <Smile size={24} color="white" />,
            color: "#FF6B6B",
        },
        {
            id: "support",
            name: "Circulation & Support Complex",
            description: "Ensures smooth delivery and prevents side effects",
            icon: <Heart size={24} color="white" />,
            color: "#32D583",
        },
    ];

    const ingredients: Record<Category["id"], Ingredient[]> = {
        stimulation: [
            {
                id: "caffeine",
                name: "Natural Caffeine",
                source: "Green Coffee Bean",
                function: "Adenosine antagonist",
                effect: "Mental alertness, energy boost",
                icon: <Coffee size={20} />,
                description:
                    "Natural caffeine blocks adenosine receptors, preventing the onset of tiredness and promoting alertness.",
            },
            {
                id: "theacrine",
                name: "Theacrine",
                function: "Adenosine modulator",
                effect: "Extended alertness, no tolerance building",
                icon: <Sunrise size={20} />,
                description:
                    "Similar to caffeine but with a longer half-life, theacrine provides sustained energy without building tolerance over time, meaning consistent effects with regular use.",
            },
            {
                id: "theanine",
                name: "L-Theanine",
                function: "Glutamate modulator",
                effect: "Smooths stimulation, promotes alpha waves",
                icon: <Activity size={20} />,
                description:
                    "Found naturally in green tea, L-theanine promotes alpha brain waves associated with relaxed alertness, balancing the stimulatory effects of caffeine.",
            },
            {
                id: "tyrosine",
                name: "Tyrosine",
                function: "Catecholamine precursor",
                effect: "Supports dopamine/norepinephrine production",
                icon: <Brain size={20} />,
                description:
                    "An amino acid that serves as a building block for dopamine and norepinephrine, supporting mental performance especially under stress.",
            },
            {
                id: "dmpea",
                name: "DMPEA",
                function: "Neuromodulator",
                effect: "Enhanced mental clarity and focus",
                icon: <Zap size={20} />,
                description:
                    "A naturally-occurring compound that helps enhance neural signaling for improved mental clarity and sustained focus.",
            },
        ],
        mood: [
            {
                id: "saffron",
                name: "Saffron Extract",
                function: "Mild serotonergic activity",
                effect: "Positive mood support, emotional balance",
                icon: <Smile size={20} />,
                description:
                    "This premium spice contains compounds that gently support serotonin activity, promoting positive mood and emotional well-being.",
            },
            {
                id: "taurine",
                name: "Taurine",
                function:
                    "Calms the nervous system, protects against oxidative stress and inflammation",
                effect:
                    "Lowers blood pressure, supports healthy heart function",
                icon: <AlertCircle size={20} />,
                description:
                    "Taurine calms the nervous system, protects against oxidative stress and inflammation, lowers blood pressure, and supports healthy heart function.",
            },
            {
                id: "dmpea",
                name: "DMPEA",
                function: "Neuromodulator",
                effect: "Enhanced mental clarity and focus",
                icon: <Zap size={20} />,
                description:
                    "A naturally-occurring compound that helps enhance neural signaling for improved mental clarity and sustained focus.",
            },
        ],
        support: [
            {
                id: "citrulline",
                name: "L-Citrulline",
                function: "Nitric oxide precursor",
                effect: "Vasodilation, counteracts stimulant vasoconstriction",
                icon: <Heart size={20} />,
                description:
                    "Promotes healthy blood flow by supporting nitric oxide production, which helps counteract the vasoconstriction often caused by stimulants.",
            },
            {
                id: "lemonbalm",
                name: "Lemon Balm Extract",
                function: "GABA transaminase inhibitor",
                effect: "Anxiety reduction, relaxation without sedation",
                icon: <Droplets size={20} />,
                description:
                    "This calming herb helps support GABA, a relaxing neurotransmitter, without causing drowsiness - perfect for maintaining clarity while reducing anxiety.",
            },
            {
                id: "magnesium",
                name: "Magnesium",
                source: "as L-threonate",
                function: "NMDA modulation",
                effect: "Neurological support, excitotoxicity prevention",
                icon: <Brain size={20} />,
                description:
                    "This highly bioavailable form of magnesium can cross the blood-brain barrier, supporting healthy neural function and preventing overstimulation.",
            },
        ],
    };

    const harmonyEffects = [
        {
            name: "Balanced Stimulation",
            description:
                "Caffeine and theacrine provide immediate and sustained energy, while L-theanine and lemon balm smooth the experience, preventing jitters or anxiety.",
            ingredients: [
                "caffeine",
                "theacrine",
                "theanine",
                "lemonbalm",
                "taurine",
            ],
        },
        {
            name: "Enhanced Cognitive Function",
            description:
                "DMPEA and tyrosine support neurotransmitter production, while magnesium L-threonate provides neurological support for optimal brain function.",
            ingredients: ["dmpea", "tyrosine", "magnesium"],
        },
        {
            name: "Positive Mood Elevation",
            description:
                "Saffron extract gently supports serotonin pathways while taurine buffers excessive excitation, creating a balanced emotional state.",
            ingredients: ["saffron", "taurine"],
        },
        {
            name: "Smooth Physical Experience",
            description:
                "L-citrulline counteracts the vasoconstriction of stimulants, ensuring comfortable physical sensations and preventing side effects.",
            ingredients: ["citrulline", "caffeine"],
        },
    ];

    const handleIngredientClick = (ingredient: Ingredient) => {
        if (activeIngredient === ingredient.id) {
            setActiveIngredient(null);
        } else {
            setActiveIngredient(ingredient.id);
        }
        setShowHarmony(false);
    };

    const getActiveIngredients = (): Ingredient[] => {
        return ingredients[activeCategory as Category["id"]] || [];
    };

    const getActiveIngredientDetails = (): Ingredient | undefined => {
        const allIngredients = [
            ...ingredients.stimulation,
            ...ingredients.mood,
            ...ingredients.support,
        ];
        return allIngredients.find((i) => i.id === activeIngredient);
    };

    const getCategoryColor = () => {
        const category = categories.find((c) => c.id === activeCategory);
        return category ? category.color : "#4C6FFF";
    };

    return (
        <div className="w-full max-w-6xl mx-auto shadow-xl overflow-hidden bg-neutral-900">
            {/* Category Selection */}
            <div className="flex flex-col md:flex-row bg-white">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`flex items-center px-6 py-4 text-left transition-colors duration-300 focus:outline-none rounded-none ${
                            activeCategory === category.id
                                ? "bg-neutral-800 text-white shadow-sm border-b-2 md:border-b-0 md:border-l-4 border-[#FF0000]"
                                : "bg-white text-neutral-800"
                        }`}
                        onClick={() => {
                            setActiveCategory(category.id);
                            setActiveIngredient(null);
                            setShowHarmony(false);
                        }}
                        aria-pressed={activeCategory === category.id}
                        tabIndex={0}
                    >
                        <span
                            className={`mr-3 ${
                                activeCategory === category.id
                                    ? "text-[#FF0000]"
                                    : "text-neutral-400"
                            }`}
                        >
                            {category.icon}
                        </span>
                        <div>
                            <h3
                                className={`font-semibold text-sm md:text-base ${
                                    activeCategory === category.id
                                        ? "text-white"
                                        : "text-neutral-900"
                                }`}
                            >
                                {category.name}
                            </h3>
                            <p
                                className={`text-xs ${
                                    activeCategory === category.id
                                        ? "text-neutral-400"
                                        : "text-neutral-500"
                                }`}
                            >
                                {category.description}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-600 min-h-[400px]">
                {/* Ingredients List */}
                <div className="md:col-span-1">
                    <h3 className="text-lg font-semibold mb-4 text-neutral-200">
                        Ingredients
                    </h3>
                    <div className="space-y-2 max-h-[320px] md:max-h-[500px] overflow-y-auto pr-1">
                        {getActiveIngredients().map((ingredient) => (
                            <div
                                key={ingredient.id}
                                className={`p-3 rounded-xl cursor-pointer transition-all duration-300 group border-2 flex items-center ${
                                    activeIngredient === ingredient.id
                                        ? "bg-neutral-800 border-[#FF0000] shadow-md"
                                        : "bg-neutral-700 border-neutral-800 hover:border-[#FF0000]"
                                }`}
                                onClick={() =>
                                    handleIngredientClick(ingredient)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        handleIngredientClick(ingredient);
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                                aria-pressed={activeIngredient ===
                                    ingredient.id}
                                style={{
                                    boxShadow:
                                        activeIngredient === ingredient.id
                                            ? "0 2px 12px #FF000033"
                                            : undefined,
                                }}
                            >
                                <span
                                    className={`p-2 rounded-full mr-3 flex items-center justify-center border-2 ${
                                        activeIngredient === ingredient.id
                                            ? "border-[#FF0000] bg-neutral-900"
                                            : "border-neutral-700 bg-neutral-800"
                                    }`}
                                    style={{
                                        color:
                                            activeIngredient === ingredient.id
                                                ? PRIMARY_COLOR
                                                : "#fff",
                                    }}
                                >
                                    {ingredient.icon}
                                </span>
                                <div className="flex-1">
                                    <h4
                                        className={`font-bold text-base ${
                                            activeIngredient === ingredient.id
                                                ? "text-[#FF0000]"
                                                : "text-neutral-100"
                                        }`}
                                    >
                                        {ingredient.name}
                                    </h4>
                                    <p
                                        className={`text-xs ${
                                            activeIngredient === ingredient.id
                                                ? "text-[#FF8181]"
                                                : "text-neutral-400"
                                        }`}
                                    >
                                        {ingredient.effect}
                                    </p>
                                </div>
                                <ChevronRight
                                    size={16}
                                    className={`transition-transform duration-300 ${
                                        activeIngredient === ingredient.id
                                            ? "rotate-90 text-[#FF0000]"
                                            : "text-neutral-400"
                                    }`}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        className="mt-6 w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center transition-colors duration-300 focus:outline-none border-2 border-neutral-800 bg-neutral-800 text-neutral-200 hover:border-[#FF0000]"
                        style={{
                            color: showHarmony ? PRIMARY_COLOR : undefined,
                            borderColor: showHarmony
                                ? PRIMARY_COLOR
                                : undefined,
                        }}
                        onClick={() => {
                            setShowHarmony(!showHarmony);
                            setActiveIngredient(null);
                        }}
                        aria-pressed={showHarmony}
                    >
                        <span className="mr-2">
                            {showHarmony ? "Hide" : "Show"} Harmony Effects
                        </span>
                        {showHarmony
                            ? <ChevronLeft size={16} />
                            : <ChevronRight size={16} />}
                    </button>
                </div>

                {/* Detail View */}
                <div className="md:col-span-2 bg-neutral-400 rounded-xl p-6 text-neutral-900 min-h-[400px] transition-[min-height] duration-300 flex flex-col justify-start">
                    {activeIngredient && !showHarmony && (
                        <div className="animate-fadeIn">
                            <div className="flex items-center h-full mb-4">
                                <span
                                    className="p-2 rounded-full mr-3 flex items-center justify-center border-2 border-[#FF0000] bg-neutral-100"
                                    style={{ color: PRIMARY_COLOR }}
                                >
                                    {getActiveIngredientDetails()?.icon}
                                </span>
                                <h2 className="text-xl font-bold text-neutral-900 !mb-0">
                                    {getActiveIngredientDetails()?.name}
                                    {getActiveIngredientDetails()?.source && (
                                        <span className="text-sm font-normal ml-2 text-neutral-500">
                                            ({getActiveIngredientDetails()
                                                ?.source})
                                        </span>
                                    )}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div className="bg-neutral-100 rounded-xl p-4 shadow-sm border border-neutral-200">
                                    <h3 className="text-sm font-semibold mb-1 text-neutral-500">
                                        Function
                                    </h3>
                                    <p className="text-neutral-800 font-medium">
                                        {getActiveIngredientDetails()?.function}
                                    </p>
                                </div>
                                <div className="bg-neutral-100 rounded-xl p-4 shadow-sm border border-neutral-200">
                                    <h3 className="text-sm font-semibold mb-1 text-neutral-500">
                                        Effect Profile
                                    </h3>
                                    <p className="text-neutral-800 font-medium">
                                        {getActiveIngredientDetails()?.effect}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-neutral-100 rounded-xl p-5 shadow-sm border border-neutral-200">
                                <div className="flex items-center mb-2">
                                    <Info
                                        size={16}
                                        className="text-[#FF0000] mr-2"
                                    />
                                    <h3 className="text-sm font-semibold text-neutral-700">
                                        How It Works
                                    </h3>
                                </div>
                                <p className="text-neutral-700 leading-relaxed">
                                    {getActiveIngredientDetails()?.description}
                                </p>
                            </div>
                        </div>
                    )}

                    {showHarmony && (
                        <div className="animate-fadeIn">
                            <h2 className="text-xl font-bold mb-6 text-neutral-100">
                                Harmony Effects
                            </h2>
                            <p className="text-neutral-400 mb-6">
                                The Proprietary Bevvy Blend creates synergistic
                                effects when ingredients work together,
                                enhancing each other&apos;s benefits and
                                creating balanced effects.
                            </p>
                            <div className="space-y-4">
                                {harmonyEffects.map((effect, index) => (
                                    <div
                                        key={index}
                                        className="bg-neutral-800 rounded-xl p-5 shadow-sm border border-neutral-700"
                                    >
                                        <h3 className="font-bold mb-2 text-neutral-100">
                                            {effect.name}
                                        </h3>
                                        <p className="text-neutral-400 mb-3">
                                            {effect.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {effect.ingredients.map(
                                                (ingredientId) => {
                                                    const allIngredients = [
                                                        ...ingredients
                                                            .stimulation,
                                                        ...ingredients.mood,
                                                        ...ingredients.support,
                                                    ];
                                                    const ingredient =
                                                        allIngredients.find((
                                                            i,
                                                        ) => i.id ===
                                                            ingredientId
                                                        );
                                                    if (!ingredient) {
                                                        return null;
                                                    }
                                                    return (
                                                        <span
                                                            key={ingredientId}
                                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border border-[#FF0000] bg-neutral-900 text-neutral-100 mt-2"
                                                            style={{
                                                                letterSpacing:
                                                                    "0.03em",
                                                            }}
                                                        >
                                                            <span className="mr-1 text-[#FF0000]">
                                                                ●
                                                            </span>{" "}
                                                            {ingredient.name}
                                                        </span>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!activeIngredient && !showHarmony && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border-2 border-neutral-700 bg-neutral-800">
                                <Info size={24} className="text-[#FF0000]" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-neutral-100">
                                Explore Bevvy&apos;s Ingredients
                            </h3>
                            <p className="text-neutral-400 max-w-md">
                                Select an ingredient from the list to learn more
                                about its function and effects, or discover how
                                they work together in harmony.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BevvyIngredientsExperience;
