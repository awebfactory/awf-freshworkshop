import { Post } from "../../utils/posts.ts";

const post: Post = {
  id: "eat-and-sleep",
  title: "Eat and Sleep",
  publishAt: new Date("2020-01-01"),
  snippet: "The second post.",
  content: "Eat and sleep is...",
};

export default function PostPage() {
  return (
    <div class="px-4 mx-auto max-w-screen-md">
      <p class="text-gray-600 mt-12">
        {post.publishAt.toLocaleDateString()}
      </p>
      <h1 class="font-bold text-5xl mt-2">{post.title}</h1>
      <div class="mt-12">{post.content}</div>
    </div>
  );
}
