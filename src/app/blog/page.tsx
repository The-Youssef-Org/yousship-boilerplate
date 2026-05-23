import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import { posts } from "@/libs/blog";
import CardArticle from "@/components/blog/CardArticle";
import PostMeta from "@/components/blog/PostMeta";
import CategoryTag from "@/components/blog/CategoryTag";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = getSEOTags({
  title: "Blog",
  description: `Tutorials, playbooks and updates from the ${config.appName} team.`,
  canonicalUrlRelative: "/blog",
});

const BlogIndex = () => {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const [featured, ...rest] = sorted;

  return (
    <>
      <Header />
      <main className="flex-1 bg-base-100">
        {/* Page header */}
        <section
          className="border-b border-base-300 bg-base-200/40"
          style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
        >
          <div
            className="mx-auto max-w-7xl"
            style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          >
            <div className="mb-4">
              {config.breadcrumbs.enabled && <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Blog" },
              ]} />}
            </div>
            <p
              className="font-medium uppercase text-primary"
              style={{ fontSize: "0.875rem", letterSpacing: "0.1em" }}
            >
              The {config.appName} blog
            </p>
            <h1
              className="font-extrabold tracking-tight text-base-content"
              style={{ marginTop: "0.75rem", fontSize: "clamp(2.25rem, 4vw, 3rem)" }}
            >
              Build, ship, and grow your SaaS.
            </h1>
            <p
              className="text-base-content/70"
              style={{ marginTop: "1rem", maxWidth: "42rem", fontSize: "1.125rem" }}
            >
              Tutorials, playbooks, and behind-the-scenes notes from the team
              shipping {config.appName}.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            </div>
          </div>
        </section>

        {/* Featured post */}
        {featured && (
          <section
            className="mx-auto max-w-7xl"
            style={{ paddingLeft: "2rem", paddingRight: "2rem", paddingTop: "2.5rem" }}
          >
            <article className="group overflow-hidden rounded-3xl ring-1 ring-base-300 transition hover:shadow-md lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              {featured.cover && (
                <Link href={`/blog/${featured.slug}`} className="bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.cover}
                    alt={featured.title}
                    className="h-full w-full object-contain transition group-hover:scale-[1.02]"
                    style={{ aspectRatio: "16 / 9" }}
                  />
                </Link>
              )}
              <div
                className="flex flex-col justify-center"
                style={{ padding: "2rem" }}
              >
                <span
                  className="inline-flex w-fit rounded-full bg-primary/10 font-semibold uppercase text-primary"
                  style={{
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  Featured
                </span>
                <h2
                  className="font-bold text-base-content group-hover:text-primary"
                  style={{ marginTop: "1rem", fontSize: "1.875rem" }}
                >
                  <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p
                  className="text-base-content/70"
                  style={{ marginTop: "0.75rem", fontSize: "1rem" }}
                >
                  {featured.description}
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  <PostMeta post={featured} />
                </div>
                {featured.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <CategoryTag key={tag} name={tag} />
                    ))}
                  </div>
                )}
              </div>
            </article>
          </section>
        )}

        {/* Post grid */}
        <section
          className="mx-auto max-w-7xl"
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingTop: "3rem",
            paddingBottom: "4rem",
          }}
        >
          <h3
            className="font-semibold uppercase text-base-content/60"
            style={{ fontSize: "0.875rem", letterSpacing: "0.1em" }}
          >
            All posts
          </h3>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ marginTop: "1.5rem", rowGap: "2rem", columnGap: "2rem" }}
          >
            {rest.map((p) => (
              <CardArticle key={p.slug} post={p} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogIndex;
