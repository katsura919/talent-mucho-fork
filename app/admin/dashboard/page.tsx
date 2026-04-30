import { Metadata } from "next";
import CommunityDashboard from "./community-dashboard";
import communityData from "@/data/community-combined.json";
import AuthGuard from "./auth-guard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: "noindex, nofollow",
};

export default function AdminDashboardPage() {
  return (
    <AuthGuard>
      <CommunityDashboard data={communityData} />
    </AuthGuard>
  );
}
