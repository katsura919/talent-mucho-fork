export default function ChallengeSection() {
    const pains = [
        {
            number: "01",
            heading: "Hiring eats your time and your sanity",
            body: "You post, you wait, you interview, you pray. Three months later you're starting over. There has to be a better way.",
        },
        {
            number: "02",
            heading: "Freelancers who ghost you",
            body: "You spend two weeks training someone, they deliver half the work, then disappear. Your time is gone. Your standards weren't too high ~ theirs were just too low.",
        },
        {
            number: "03",
            heading: "Agencies that don't actually get you",
            body: "They send a stack of CVs and call it done. No one asks how you actually work, what you've built, or who you need right now.",
        },
        {
            number: "04",
            heading: "AI feels overwhelming to start",
            body: "Everyone's talking about it. You know it matters. But between running your business and your life, who has time to figure it all out? That's where we come in.",
        },
    ];

    return (
        <section className="section-padding bg-beige-50">
            <div className="section-container">
                <div className="max-w-3xl">
                    <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-5">
                        The Problem
                    </p>
                    <h2 className="mb-6" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}>
                        You&apos;re running a business and a household. Something has to give.
                    </h2>
                    <p className="text-lg text-espresso-800 leading-relaxed mb-16 max-w-2xl">
                        Most women founders we talk to are doing too much, trusting the wrong people, and wondering if AI is even worth figuring out. We hear you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pains.map((pain, i) => (
                        <div
                            key={i}
                            className="group relative bg-white rounded-2xl p-8 border border-beige-200 shadow-sm hover:shadow-md hover:border-clay-300 transition-all duration-500"
                        >
                            <span
                                className="absolute top-8 right-8 text-5xl font-light text-beige-200 select-none pointer-events-none"
                                style={{ fontFamily: "var(--font-cormorant)" }}
                            >
                                {pain.number}
                            </span>
                            <div className="w-10 h-px bg-clay-500 mb-6" />
                            <h3 className="text-xl font-semibold text-charcoal-900 mb-3 pr-12 leading-tight">
                                {pain.heading}
                            </h3>
                            <p className="text-espresso-800 text-sm leading-relaxed">{pain.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
