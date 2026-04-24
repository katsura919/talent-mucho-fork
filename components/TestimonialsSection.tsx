import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

type Testimonial = {
    name: string
    role: string
    image: string
    quote: string
}

const testimonials: Testimonial[] = [
    {
        name: 'Jonathan Yombo',
        role: 'Business Coach',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        quote: 'Talent Mucho completely transformed how I run my coaching business. Finding a reliable VA who understood my industry was a game-changer.',
    },
    {
        name: 'Yves Kalume',
        role: 'Founder, Tech Solutions',
        image: 'https://randomuser.me/api/portraits/men/6.jpg',
        quote: 'We needed a highly-skilled developer fast, and they delivered. The vetting process is incredible. We saved weeks of recruitment headaches.',
    },
    {
        name: 'Yucel Faruksahan',
        role: 'E-commerce Entrepreneur',
        image: 'https://randomuser.me/api/portraits/men/7.jpg',
        quote: 'From customer support to inventory management, the remote talent I hired through Talent Mucho has allowed me to finally step back and focus on scaling my brand.',
    },
    {
        name: 'Anonymous author',
        role: 'Startup Founder',
        image: 'https://randomuser.me/api/portraits/men/8.jpg',
        quote: 'I was hesitant about building a remote team, but Talent Mucho made it seamless. They handled everything, and the talent quality exceeded my expectations by miles.',
    },
    {
        name: 'Shekinah Tshiokufila',
        role: 'Creative Agency Owner',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        quote: 'Hiring a specialized marketing assistant through them gave my agency the breathing room to take on three new enterprise clients this quarter. Absolute lifesavers.',
    },
    {
        name: 'Oketa Fred',
        role: 'Real Estate Investor',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        quote: 'I absolutely love the onboarding process! They found me an Executive Assistant who manages my entire calendar, lead flow, and inbox flawlessly.',
    },
    {
        name: 'Zeki',
        role: 'SaaS Founder',
        image: 'https://randomuser.me/api/portraits/men/5.jpg',
        quote: "Partnering with Talent Mucho has been like unlocking a secret scaling superpower. The tech talent they source is top-tier and their support is unmatched.",
    },
    {
        name: 'Joseph Kitheka',
        role: 'Marketing Consultant',
        image: 'https://randomuser.me/api/portraits/men/9.jpg',
        quote: 'Talent Mucho has transformed the way I delegate. Have a dedicated designer and copywriter on my team has significantly accelerated my workflow and client delivery.',
    },
    {
        name: 'Khatab Wedaa',
        role: 'Solopreneur',
        image: 'https://randomuser.me/api/portraits/men/10.jpg',
        quote: "It's an elegant, clean, and highly responsive service. If you're a solopreneur trying to do it all, stop right now and book a call with this team.",
    },
    {
        name: 'Rodrigo Aguilar',
        role: 'Content Creator',
        image: 'https://randomuser.me/api/portraits/men/11.jpg',
        quote: 'I love Talent Mucho ❤️. Having a dedicated video editor and social media manager has allowed me to focus purely on content creation. It makes growing an audience so much easier.',
    },
    {
        name: 'Eric Ampire',
        role: 'Fitness Coach',
        image: 'https://randomuser.me/api/portraits/men/12.jpg',
        quote: 'They are the perfect solution for anyone who wants to scale without the stress of traditional hiring. My client management is now fully automated thanks to my remote team.',
    },
    {
        name: 'Roland Tubonge',
        role: 'Financial Advisor',
        image: 'https://randomuser.me/api/portraits/men/13.jpg',
        quote: 'The level of professionalism from the staff they place is incredible. My VA handles all client scheduling and onboarding perfectly. Let yourself be convinced!',
    },
]

const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
    const result: Testimonial[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

const testimonialChunks = chunkArray(testimonials, Math.ceil(testimonials.length / 3))

export default function WallOfLoveSection() {
    return (
        <section id="testimonials" className="section-padding bg-beige-100 relative overflow-hidden">
            <div className="section-container relative z-10 w-full">
                <div className="mx-auto max-w-6xl text-center mb-16 md:mb-24">
                    <p className="text-clay-500 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
                        What Clients Say
                    </p>
                    <h2
                        className="text-charcoal-900 mb-6 leading-[1.1]"
                        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                    >
                        Real results from real founders.
                    </h2>
                    <p className="text-taupe-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        These are people who were exactly where you are ~ and decided to stop doing it all themselves.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonialChunks.map((chunk, chunkIndex) => (
                        <div
                            key={chunkIndex}
                            className="space-y-6">
                            {chunk.map(({ name, role, quote, image }, index) => (
                                <Card key={index} className="border border-beige-200/50 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
                                    <CardContent className="grid grid-cols-[auto_1fr] gap-4 pt-6 bg-white rounded-2xl">
                                        <Avatar className="size-10 border border-beige-200/50">
                                            <AvatarImage
                                                alt={name}
                                                src={image}
                                                loading="lazy"
                                                width="120"
                                                height="120"
                                            />
                                            <AvatarFallback className="bg-clay-50/50 text-clay-600">TM</AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <h3 className="font-semibold text-charcoal-900">{name}</h3>

                                            <span className="text-taupe-400 block text-xs font-medium tracking-wide mt-0.5">{role}</span>

                                            <blockquote className="mt-4">
                                                <p className="text-taupe-500 text-sm leading-relaxed">&ldquo;{quote}&rdquo;</p>
                                            </blockquote>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}