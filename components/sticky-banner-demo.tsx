import { StickyBanner } from "@/components/ui/sticky-banner";
import Link from "next/link";

export default function OffersBanner() {
  return (
    <StickyBanner className="bg-clay-500  z-[60]">
      <p className="mx-0 max-w-[90%] text-beige-50 font-medium text-sm md:text-base drop-shadow-sm text-center">
        Exclusive Limited Offer for WeMeetWednesday Ladies!{" "}
        <Link href="/offers" className="font-bold underline decoration-beige-50/50 hover:decoration-beige-50 transition duration-200 ml-1">
          Claim Website + VA Bundle
        </Link>
      </p>
    </StickyBanner>
  );
}
