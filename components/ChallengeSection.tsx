export default function ChallengeSection() {
    const pains = [
        {
            number: "01",
            heading: "Hiring is expensive & slow",
            body: "Local talent costs are soaring. Job boards waste your time. The average hire takes 3–6 months and still might not be the right fit.",
        },
        {
            number: "02",
            heading: "Freelancers disappear",
            body: "You spend weeks onboarding someone, they deliver mediocre work, then vanish. No accountability, no continuity, no results.",
        },
        {
            number: "03",
            heading: "Agencies offer volume, not fit",
            body: "Big staffing agencies send you a pile of resumes. Nobody takes time to understand your culture, your workflow, or your actual goals.",
        },
        {
            number: "04",
            heading: "AI tools exist. Adoption doesn't.",
            body: "Your team has access to powerful AI. Without proper training, they use 5% of what's possible. Productivity stays flat. Your competitive edge stays locked.",
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
                        Building a great team has never been harder
                    </h2>
                    <p className="text-lg text-espresso-800 leading-relaxed mb-16 max-w-2xl">
                        The modern workforce spans continents and time zones. Founders spend more time managing hiring than growing their business.
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
