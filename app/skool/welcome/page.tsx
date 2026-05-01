import { Suspense } from "react";
import SkoolWelcomeClient from "./SkoolWelcomeClient";

export default function SkoolWelcomePage() {
  return (
    <Suspense fallback={null}>
      <SkoolWelcomeClient />
    </Suspense>
  );
}
