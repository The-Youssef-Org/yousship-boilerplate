import type { BlogPost } from "@/libs/blog";
import Avatar from "./Avatar";

const PostMeta = ({ post }: { post: BlogPost }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-base-content/60">
      <Avatar author={post.author} size={28} />
      <span className="font-medium text-base-content/80">{post.author.name}</span>
      <span>·</span>
      <time dateTime={post.date}>
        {new Date(post.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </time>
    </div>
  );
};

export default PostMeta;
