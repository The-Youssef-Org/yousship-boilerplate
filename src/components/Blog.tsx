import Link from "next/link";
import { posts as allPosts, type BlogPost } from "@/libs/blog";
import CardArticle from "./blog/CardArticle";

export type { BlogPost };

const Blog = ({ posts = allPosts.slice(0, 3) }: { posts?: BlogPost[] }) => {
  return (
    <section className="bg-base-100 px-8 py-24">
      <div className="mx-auto max-w-7xl">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
          From the blog
        </h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-blue-700 hover:text-blue-800"
        >
          View all →
        </Link>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <CardArticle key={p.slug} post={p} />
        ))}
      </div>
      </div>
    </section>
  );
};

export default Blog;
