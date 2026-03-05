"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../../components/Header";
import CTASection from "../../../components/CTASection";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Tag,
  Share2,
  Linkedin,
  Twitter,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { getBlogBySlug } from "@/api/blogs.api";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  category?: string;
  createdAt: string;
  publishedAt?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getBlogBySlug(slug);
        setBlog(data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError("Blog post not found");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <main className="pt-24">
        {/* Loading State */}
        {loading && (
          <section className="section-padding bg-beige-50">
            <div className="section-container">
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-clay-500" />
              </div>
            </div>
          </section>
        )}

        {/* Error State */}
        {error && !loading && (
          <section className="section-padding bg-beige-50">
            <div className="section-container">
              <div className="text-center py-16 px-6 rounded-2xl max-w-2xl mx-auto card">
                <h3 className="text-xl font-semibold mb-4 text-espresso-700">
                  {error}
                </h3>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 font-semibold text-clay-500"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Blog Content */}
        {blog && !loading && !error && (
          <>
            {/* Article Header */}
            <section className="section-padding bg-beige-100 pb-0">
              <div className="section-container">
                <div className="max-w-3xl mx-auto">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-beige-200 text-clay-500 text-xs font-medium rounded-full uppercase tracking-wider mb-6">
                    <Tag className="w-3 h-3" />
                    {blog.category || "Article"}
                  </span>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6">
                    {blog.title}
                  </h1>

                  <p className="text-lg md:text-xl text-taupe-400 leading-relaxed mb-8">
                    {blog.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-beige-300">
                    <div className="flex items-center gap-4 text-sm text-taupe-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(blog.publishedAt || blog.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-taupe-400">Share:</span>
                      <button className="p-2 rounded-full bg-beige-200 text-espresso-700 hover:bg-beige-300 transition-colors">
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-full bg-beige-200 text-espresso-700 hover:bg-beige-300 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-full bg-beige-200 text-espresso-700 hover:bg-beige-300 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Image */}
            <section className="py-12 bg-beige-100">
              <div className="section-container">
                <div className="max-w-4xl mx-auto">
                  {blog.featuredImage && (
                    <div className="relative h-64 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Article Content */}
            <section className="section-padding bg-beige-50">
              <div className="section-container">
                <article className="max-w-3xl mx-auto">
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  <style jsx>{`
                    .blog-content {
                      line-height: 1.8;
                      font-size: 1.125rem;
                      color: #6b5e4c;
                    }

                    .blog-content :global(p) {
                      margin-bottom: 1.5rem;
                      line-height: 1.8;
                    }

                    .blog-content :global(h1) {
                      font-size: 2.25rem;
                      font-weight: bold;
                      margin-top: 2.5rem;
                      margin-bottom: 1.25rem;
                      color: #3d2f1f;
                    }

                    .blog-content :global(h2) {
                      font-size: 1.875rem;
                      font-weight: bold;
                      margin-top: 2.5rem;
                      margin-bottom: 1.25rem;
                      color: #3d2f1f;
                    }

                    .blog-content :global(h3) {
                      font-size: 1.5rem;
                      font-weight: bold;
                      margin-top: 2rem;
                      margin-bottom: 1rem;
                      color: #3d2f1f;
                    }

                    .blog-content :global(h4) {
                      font-size: 1.25rem;
                      font-weight: bold;
                      margin-top: 1.5rem;
                      margin-bottom: 0.75rem;
                      color: #3d2f1f;
                    }

                    .blog-content :global(ul) {
                      margin-bottom: 1.5rem;
                      padding-left: 2rem;
                      list-style-type: disc;
                      list-style-position: outside;
                    }

                    .blog-content :global(ol) {
                      margin-bottom: 1.5rem;
                      padding-left: 2rem;
                      list-style-type: decimal;
                      list-style-position: outside;
                    }

                    .blog-content :global(li) {
                      margin-bottom: 0.75rem;
                      margin-left: 0.5rem;
                      line-height: 1.8;
                    }

                    .blog-content :global(a) {
                      color: #a67c52;
                      text-decoration: underline;
                      transition: opacity 0.2s;
                    }

                    .blog-content :global(a:hover) {
                      opacity: 0.8;
                    }

                    .blog-content :global(strong) {
                      font-weight: 600;
                      color: #3d2f1f;
                    }

                    .blog-content :global(blockquote) {
                      border-left: 4px solid #a67c52;
                      padding-left: 1.5rem;
                      margin: 2rem 0;
                      font-style: italic;
                      color: #8a7a6a;
                    }

                    .blog-content :global(code) {
                      background: #f5f1ed;
                      padding: 0.25rem 0.5rem;
                      border-radius: 0.25rem;
                      font-size: 0.875rem;
                      border: 1px solid #e8dfd5;
                    }

                    .blog-content :global(pre) {
                      background: #f5f1ed;
                      padding: 1.5rem;
                      border-radius: 0.5rem;
                      overflow-x: auto;
                      margin-bottom: 1.5rem;
                      border: 1px solid #e8dfd5;
                    }

                    .blog-content :global(img) {
                      border-radius: 0.75rem;
                      margin: 2rem 0;
                      max-width: 100%;
                      height: auto;
                    }
                  `}</style>

                  {/* Back to Blog CTA */}
                  <div className="mt-16 pt-8 border-t border-beige-200">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-clay-500 font-semibold text-lg hover:gap-3 transition-all"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Read More Articles
                    </Link>
                  </div>
                </article>
              </div>
            </section>

          </>
        )}
      </main>
    </>
  );
}
