export default function JsonLd() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://talentmucho.com";

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Talent Mucho",
        description:
            "A boutique global talent studio helping companies build meaningful, distributed teams through curated remote staffing and talent sourcing.",
        url: baseUrl,
        logo: `${baseUrl}/tm-logo.png`,
        sameAs: [
            "https://facebook.com/talentmucho",
            "https://instagram.com/talentmucho",
            "https://tiktok.com/@talentmucho",
            "https://threads.net/@talentmucho",
        ],
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            availableLanguage: ["English"],
        },
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Talent Mucho",
        url: baseUrl,
        description:
            "Build your distributed team with Talent Mucho - Global talent sourcing and remote staffing solutions.",
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };

    const professionalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Talent Mucho",
        description:
            "Remote staffing agency providing curated talent sourcing, dedicated team members, and flexible hiring models for building distributed teams globally.",
        url: baseUrl,
        logo: `${baseUrl}/tm-logo.png`,
        telephone: "+34657752940",
        email: "hello@talentmucho.com",
        priceRange: "$$",
        address: [
            {
                "@type": "PostalAddress",
                addressLocality: "Madrid",
                addressCountry: "ES",
            },
            {
                "@type": "PostalAddress",
                addressLocality: "Cagayan de Oro City",
                addressCountry: "PH",
            },
        ],
        sameAs: [
            "https://facebook.com/talentmucho",
            "https://instagram.com/talentmucho",
            "https://tiktok.com/@talentmucho",
            "https://threads.net/@talentmucho",
        ],
        serviceType: [
            "Remote Staffing",
            "Talent Sourcing",
            "Team Building",
            "Recruitment",
        ],
        areaServed: {
            "@type": "GeoShape",
            name: "Worldwide",
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Staffing Services",
            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Remote Staffing Solutions",
                        description:
                            "Access a global talent pool of carefully vetted professionals ready to integrate seamlessly with your team.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Talent Sourcing & Vetting",
                        description:
                            "Deep screening for skills, culture fit, and long-term potential beyond resumes.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Dedicated Team Members",
                        description:
                            "Build your extended team with professionals who work exclusively for you.",
                    },
                },
            ],
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(professionalServiceSchema),
                }}
            />
        </>
    );
}
