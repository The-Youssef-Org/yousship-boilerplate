import Link from "next/link";
import type { BlogPost } from "@/libs/blog";
import CategoryTag from "./CategoryTag";
import PostMeta from "./PostMeta";

const CardArticle = ({ post }: { post: BlogPost }) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-base-content/10 bg-base-content/[0.03] transition hover:-translate-y-0.5">
      {post.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover}
          alt={post.title}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover transition group-hover:scale-[1.02]"
        />
      ) : (
        <div className="aspect-[16/9] w-full bg-gradient-to-br from-cyan-100 via-sky-50 to-amber-100" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <PostMeta post={post} />
        <h3 className="mt-3 text-lg font-semibold text-base-content group-hover:text-primary">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-2 flex-1 text-sm text-base-content/70">{post.description}</p>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <CategoryTag key={tag} name={tag} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default CardArticle;
