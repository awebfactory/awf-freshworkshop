import { Handlers, PageProps } from "$fresh/server.ts";
import { listPosts, Post } from "../utils/posts.ts";
import Counter from "../islands/Counter.tsx";
import { State } from "../utils/state.ts";

interface Data extends State {
  posts: Post[];
}

export const handler: Handlers<Data, State> = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    return ctx.render({ ...ctx.state, posts });
  },
};

export default function Home(props: PageProps<Data>) {
  const { posts, locales } = props.data;
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <div class="px-4 mx-auto max-w-screen-md">
        <h1 class="font-bold text-5xl mt-12">Luca's Cats' Blog</h1>
        <ul class="mt-8">
          {posts.map((post) => <PostEntry post={post} locales={locales} />)}
        </ul>
      </div>
      <img
        src="/logo.svg"
        class="w-32 h-32"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class="my-6">
        Well, hello, worlds!
      </p>
      <Counter start={3} />
    </div>
  );
}

function PostEntry(props: { post: Post; locales: string[] }) {
  const { post, locales } = props;
  const dateFmt = new Intl.DateTimeFormat(locales, { dateStyle: "short" });
  return (
    <li class="border-t">
      <a href={`/blog/${post.id}`} class="py-2 flex group gap-4">
        <div>{dateFmt.format(post.publishAt)}</div>
        <div>
          <h2 class="font-bold group-hover:underline">{post.title}</h2>
          <p class="text-gray-600">{post.snippet}</p>
        </div>
      </a>
    </li>
  );
}
