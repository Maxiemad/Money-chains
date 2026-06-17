import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { Card, Badge } from "@/components/ui/primitives";
import { ButtonLink } from "@/components/ui/button";
import { POSTS, getPost, type BlogBlock } from "@/data/blog";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 font-display text-2xl font-semibold text-navy">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="mt-4 text-base leading-relaxed text-muted">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-muted">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="bg-white">
      {/* header */}
      <section className="border-b border-line bg-cloud py-14">
        <div className="mx-auto max-w-2xl px-5">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl shadow-[0_6px_24px_-12px_rgba(14,26,56,0.15)]"
            >
              {post.accent}
            </span>
            <Badge tone="teal">{post.category}</Badge>
          </div>
          <h1 className="mt-5 font-display text-3xl font-semibold text-navy sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <span className="font-medium text-navy">{post.author}</span>
            <span aria-hidden>·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingMins} min read
            </span>
          </div>
        </div>
      </section>

      {/* body */}
      <article className="py-12">
        <div className="mx-auto max-w-2xl px-5">
          <p className="text-lg leading-relaxed text-navy">{post.excerpt}</p>
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </article>

      {/* cta */}
      <section className="pb-16">
        <div className="mx-auto max-w-2xl px-5">
          <Card className="border-0 bg-navy p-8 text-ink">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Ready to start your first chain?
            </h2>
            <p className="mt-2 text-ink/70">
              Pick a proven template, connect your accounts securely, and let us
              guide every step. Free to start — no guarantees, just honest tools.
            </p>
            <div className="mt-6">
              <ButtonLink href="/signup" variant="mint" size="lg">
                Start free
              </ButtonLink>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
