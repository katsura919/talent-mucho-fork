import BookingEmbed from "../../components/BookingEmbed";

export const revalidate = false;

export const metadata = {
    title: "Book a Free VA Discovery Call",
    description:
        "Schedule a free 30-minute consultation to explore how our virtual assistants can streamline your operations and help you scale your business.",
};

export default function BookingPage() {
    return (
        <main className="pt-20">
            <BookingEmbed />
        </main>
    );
}
