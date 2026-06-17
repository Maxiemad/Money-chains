import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Card, Badge } from "@/components/ui/primitives";
import { POSTS } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — Honest, practical guides to making money online",
  description:
    "Plain-English, no-hype guides on money chains, niche selection, security, and what to actually expect. Written to be useful, not to sell you a dream.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = [...POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="bg-white">
      {/* hero */}
      <section className="bg-navy py-16 text-ink">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-mint">
            The MoneyChains blog
          </p>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">
            Practical, honest guides to earning online
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink/70">
            No hype, no guaranteed-income fantasies. Just clear writing on how
            the chains work, how to pick a niche that pays, and how we keep your
            accounts safe.
          </p>
        </div>
      </section>

      {/* listing */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block focus:outline-none"
              >
                <Card className="flex h-full flex-col p-6 transition-shadow group-hover:shadow-[0_10px_32px_-12px_rgba(14,26,56,0.25)] group-focus-visible:ring-2 group-focus-visible:ring-mint">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-cloud text-xl"
                    >
                      {post.accent}
                    </span>
                    <Badge tone="teal">{post.category}</Badge>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold text-navy">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                    <span className="font-medium text-navy">{post.author}</span>
                    <span aria-hidden>·</span>
                    <span>{formatDate(post.publishedAt)}</span>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingMins} min read
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
