import Image from "next/image";
import { Calendar, Tag, Share2, Linkedin, Twitter, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getBlogBySlug, getPublicBlogs } from "@/api/blogs.api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const response = await getPublicBlogs({
      businessId: process.env.NEXT_PUBLIC_BUSINESS_ID,
      limit: 100,
    });
    return response.data.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog: BlogPost = await getBlogBySlug(slug);
    return {
      title: blog.title,
      description: blog.excerpt || `Read ${blog.title} on the Talent Mucho blog.`,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: blog.featuredImage ? [{ url: blog.featuredImage }] : [],
        type: "article",
      },
    };
  } catch {
    return { title: "Blog Post Not Found" };
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let blog: BlogPost | null = null;

  try {
    blog = await getBlogBySlug(slug);
  } catch {
    notFound();
  }

  if (!blog) notFound();

  return (
    <main className="pt-24">
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
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-beige-200 text-espresso-700 hover:bg-beige-300 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.talentmucho.com/blog/${blog.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-beige-200 text-espresso-700 hover:bg-beige-300 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <button className="p-2 rounded-full bg-beige-200 text-espresso-700 hover:bg-beige-300 transition-colors" aria-label="Share">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.featuredImage && (
        <section className="py-12 bg-beige-100">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-64 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="section-padding bg-beige-50">
        <div className="section-container">
          <article className="max-w-3xl mx-auto">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

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
    </main>
  );
}
