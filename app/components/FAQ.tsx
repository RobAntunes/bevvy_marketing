import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
    {
        question:
            "What exactly is Bevvy and how is it different from other drinks?",
        answer:
            "Bevvy is a premium functional beverage that creates a noticeable cognitive and mood enhancement effect. Unlike energy drinks, it won't give you jitters, and unlike alcohol, it maintains your executive function and coordination.",
    },
    {
        question:
            "How long does the Bevvy effect last and when will I start feeling it?",
        answer:
            "You'll typically notice the initial effects within 10-15 minutes of consumption, with the full effect hitting at around 30-45 minutes. The peak experience lasts for 60-90 minutes, with a total duration of 3-4 hours. Unlike many stimulants, Bevvy is designed to taper off gently without any crash effects.",
    },
    {
        question: "Is Bevvy all-natural and what are the main ingredients?",
        answer:
            "Bevvy features a science-backed blend of natural ingredients. Our formulation balances stimulation with mood modulation and proper circulatory support for a clean, balanced experience.",
    },
    {
        question: "Can I consume Bevvy with alcohol or other beverages?",
        answer:
            "Bevvy's formula is designed to be compatible with moderate alcohol consumption. However, as with any functional beverage, we recommend trying it on its own first to understand how it affects you personally before combining it with other substances.",
    },
    {
        question: "Is Bevvy habit-forming or does it have any side effects?",
        answer:
            "Bevvy is specifically formulated to be non-habit forming with ingredients chosen to avoid tolerance building when consumed responsibly.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <div className="w-full mx-auto py-12 sm:py-16 lg:py-20 flex flex-col items-center gap-10">
            <h2 className="font-bold text-white !text-4xl sm:!text-5xl md:!text-6xl lg:!text-7xl text-center mb-10 sm:mb-12 md:mb-16">
                Frequently Asked Questions
            </h2>
            <dl className="lg:rounded-xl w-full max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto divide-y divide-white/20 py-6 sm:py-8 md:py-10 bg-white/5 lg;rounded-2xl shadow-xl">
                {faqs.map((faq, idx) => (
                    <div
                        key={faq.question}
                        className="py-4 sm:py-6 md:py-8 first:pt-0 last:pb-0 px-4 sm:px-6 md:px-8 lg:px-10 text-white"
                    >
                        <dt>
                            <button
                                type="button"
                                className="flex w-full items-start justify-between text-left focus:outline-none"
                                aria-controls={`faq-${idx}`}
                                aria-expanded={open === idx}
                                onClick={() =>
                                    setOpen(open === idx ? null : idx)}
                            >
                                <span className="text-base sm:text-lg md:text-xl font-semibold">
                                    {faq.question}
                                </span>
                                <span className="ml-4 sm:ml-6 flex h-7 items-center">
                                    {open === idx
                                        ? (
                                            <Minus
                                                className="w-5 h-5 sm:w-6 sm:h-6"
                                                aria-hidden="true"
                                            />
                                        )
                                        : (
                                            <Plus
                                                className="w-5 h-5 sm:w-6 sm:h-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                </span>
                            </button>
                        </dt>
                        <dd
                            className={`mt-2 pr-2 transition-all duration-300 text-neutral-400  ${
                                open === idx
                                    ? "max-h-[500px] h-auto pb-4 sm:pb-6 opacity-100"
                                    : "max-h-0 opacity-0 overflow-hidden"
                            }`}
                            id={`faq-${idx}`}
                        >
                            <p className="text-sm sm:text-base leading-relaxed">
                                {faq.answer}
                            </p>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
