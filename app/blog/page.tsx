"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import CTASection from "../../components/CTASection";
import Image from "next/image";
import { Calendar, ArrowLeft, Clock, Tag, Loader2 } from "lucide-react";
import Link from "next/link";
import { getPublicBlogs, type PublicBlog } from "@/api/blogs.api";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<PublicBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPublicBlogs({
          businessId: process.env.NEXT_PUBLIC_BUSINESS_ID,
          limit: 50,
        });
        setBlogs(response.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding bg-beige-100">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-taupe-400 text-sm uppercase tracking-[0.2em] mb-4">
                Insights & Resources
              </p>
              <h1 className="mb-6">From Our Journal</h1>
              <p className="text-lg md:text-xl text-taupe-400 leading-relaxed">
                Thoughts on remote work, hiring strategies, and building
                meaningful distributed teams across the globe.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section-padding bg-beige-50">
          <div className="section-container">
            <div className="max-w-6xl mx-auto">
              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-clay-500" />
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="text-center py-16 px-6 rounded-2xl max-w-2xl mx-auto card">
                  <h3 className="text-xl font-semibold mb-2 text-espresso-700">
                    {error}
                  </h3>
                </div>
              )}

              {/* Blog Posts */}
              {!loading && !error && blogs.length > 0 && (
                <>
                  {/* Featured Post */}
                  <article className="mb-16">
                    <Link
                      href={`/blog/${blogs[0].slug}`}
                      className="group block"
                    >
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="relative h-72 md:h-96 rounded-xl overflow-hidden">
                          <Image
                            src={
                              blogs[0].featuredImage ||
                              "/assets/blog-placeholder.jpg"
                            }
                            alt={blogs[0].title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-beige-50/90 backdrop-blur-sm text-clay-500 text-xs font-medium rounded-full uppercase tracking-wider">
                              <Tag className="w-3 h-3" />
                              {blogs[0].category || "Article"}
                            </span>
                          </div>
                        </div>
                        <div className="py-4">
                          <div className="flex items-center gap-4 text-sm text-taupe-400 mb-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(blogs[0].createdAt)}
                            </span>
                          </div>
                          <h2 className="text-2xl md:text-3xl mb-4 group-hover:text-clay-500 transition-colors">
                            {blogs[0].title}
                          </h2>
                          <p className="text-taupe-400 leading-relaxed text-lg mb-6">
                            {blogs[0].excerpt}
                          </p>
                          <span className="inline-flex items-center gap-2 text-clay-500 font-medium group-hover:gap-3 transition-all">
                            Read Article
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>

                  {/* Divider */}
                  <div className="divider mb-16" />

                  {/* Posts Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.slice(1).map((post) => (
                      <article key={post._id} className="group">
                        <Link href={`/blog/${post.slug}`} className="block">
                          <div className="card p-0 overflow-hidden hover:bg-beige-100/80">
                            {/* Cover Image */}
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={
                                  post.featuredImage ||
                                  "/assets/blog-placeholder.jpg"
                                }
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {/* Category Badge */}
                              <div className="absolute top-4 left-4">
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-beige-50/90 backdrop-blur-sm text-clay-500 text-xs font-medium rounded-full uppercase tracking-wider">
                                  <Tag className="w-3 h-3" />
                                  {post.category || "Article"}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                              {/* Title */}
                              <h3 className="text-xl mb-3 group-hover:text-clay-500 transition-colors duration-300">
                                {post.title}
                              </h3>

                              {/* Excerpt */}
                              <p className="text-taupe-400 leading-relaxed text-sm mb-6 line-clamp-2">
                                {post.excerpt}
                              </p>

                              {/* Meta */}
                              <div className="flex items-center gap-4 text-xs text-taupe-400 pt-4 border-t border-beige-200">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(post.createdAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </>
              )}

              {/* Empty State */}
              {!loading && !error && blogs.length === 0 && (
                <div className="text-center py-16 px-6 rounded-2xl max-w-2xl mx-auto card">
                  <h3 className="text-xl font-semibold mb-2 text-espresso-700">
                    No articles found
                  </h3>
                  <p className="text-taupe-400">
                    Check back soon for new content!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
