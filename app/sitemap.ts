import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.talentmucho.com";

    // Static routes
    const routes = [
        "",
        "/about",
        "/blog",
        "/booking",
        "/contact",
        "/offers",
        "/pricing",
        "/wemeetwednesday",
        "/services/marketing",
        "/services/personal-branding",
        "/services/virtual-assistants",
        "/services/websites",
    ];

    const staticPages: MetadataRoute.Sitemap = routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
    }));

    // Blog post pages
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...blogPages];
}
