import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import { posts, getPost } from "@/libs/blog";
import PostMeta from "@/components/blog/PostMeta";
import CategoryTag from "@/components/blog/CategoryTag";
import CardArticle from "@/components/blog/CardArticle";

type Params = { slug: string };

export const generateStaticParams = () =>
  posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return getSEOTags({ title: "Not found", index: false });

  return getSEOTags({
    title: post.title,
    description: post.description,
    canonicalUrlRelative: `/blog/${slug}`,
    openGraphImageRelativePath: post.cover ?? "/og.png",
    ogType: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Header />
      <main className="flex-1 bg-base-100">
        <article className="mx-auto max-w-3xl px-6 py-16">
          <Link
            href="/blog"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Back to blog
          </Link>

          <header className="mt-6">
            {post.tags.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <CategoryTag key={tag} name={tag} />
                ))}
              </div>
            )}
            <h1 className="text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-base-content/70">
              {post.description}
            </p>
            <div className="mt-6">
              <PostMeta post={post} />
            </div>
          </header>

          {post.cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover}
              alt={post.title}
              className="mt-10 aspect-[16/9] w-full rounded-2xl object-cover ring-1 ring-base-300"
            />
          )}

          <div
            className="prose prose-lg mt-10 max-w-none text-base-content/80 prose-headings:text-base-content prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-pre:bg-base-200"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {related.length > 0 && (
          <section className="border-t border-base-300 bg-base-200/40">
            <div className="mx-auto max-w-7xl px-8 py-16">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-base-content/60">
                Keep reading
              </h2>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                {related.map((p) => (
                  <CardArticle key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
