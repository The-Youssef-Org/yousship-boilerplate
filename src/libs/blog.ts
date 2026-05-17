import { articles, type BlogArticle } from "@/blog/_assets/content";

export type BlogPost = BlogArticle;
export type { BlogArticle };

export const posts: BlogPost[] = articles;

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
