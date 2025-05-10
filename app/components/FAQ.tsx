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
        <div className="mx-auto py-16">
            <h2 className="font-bold text-white !text-[64px] text-center mb-16">
                Frequently Asked Questions
            </h2>
            <dl className="!mt-16 divide-y w-1/2 !mx-auto divide-white/20 py-12 bg-white/5 rounded-2xl shadow-xl">
                {faqs.map((faq, idx) => (
                    <div
                        key={faq.question}
                        className="py-8 first:pt-0 last:pb-0 px-12 text-white"
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
                                <span className="text-lg font-semibold">
                                    {faq.question}
                                </span>
                                <span className="ml-6 flex h-7 items-center">
                                    {open === idx
                                        ? (
                                            <Minus
                                                className="w-6 h-6"
                                                aria-hidden="true"
                                            />
                                        )
                                        : (
                                            <Plus
                                                className="w-6 h-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                </span>
                            </button>
                        </dt>
                        <dd
                            className={`mt-2 pr-2 transition-all duration-300 text-neutral-500 ${
                                open === idx
                                    ? "max-h-96 h-auto pb-6 opacity-100"
                                    : "max-h-0 opacity-0 overflow-hidden"
                            }`}
                            id={`faq-${idx}`}
                        >
                            <p className="text-base leading-relaxed">
                                {faq.answer}
                            </p>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
