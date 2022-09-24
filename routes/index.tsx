import { Handlers, PageProps } from "$fresh/server.ts";
import { listPosts, Post } from "../utils/posts.ts";
import Counter from "../islands/Counter.tsx";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    return ctx.render(posts);
  },
};

export default function Home(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <div class="px-4 mx-auto max-w-screen-md">
        <h1 class="font-bold text-5xl mt-12">Luca's Cats' Blog</h1>
        <ul class="mt-8">
          {posts.map((post) => <PostEntry post={post} />)}
        </ul>
      </div>
      <img
        src="/logo.svg"
        class="w-32 h-32"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class="my-6">
        Hello, worlds!
      </p>
      <Counter start={3} />
    </div>
  );
}

function PostEntry(props: { post: Post }) {
  const { post } = props;
  return (
    <li class="border-t">
      <a href={`/blog/${post.id}`} class="py-2 flex group gap-4">
        <div>{post.publishAt.toDateString()}</div>
        <div>
          <h2 class="font-bold group-hover:underline">{post.title}</h2>
          <p class="text-gray-600">{post.snippet}</p>
        </div>
      </a>
    </li>
  );
}
