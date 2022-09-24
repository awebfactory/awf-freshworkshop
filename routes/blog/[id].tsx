import { loadPost, Post } from "../../utils/posts.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import * as gfm from "$gfm";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await loadPost(ctx.params.id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    return ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  const html = gfm.render(post.content);
  return (
    <div class="px-4 mx-auto max-w-screen-md">
      <p class="text-gray-600 mt-12">
        {post.publishAt.toLocaleDateString()}
      </p>
      <h1 class="font-bold text-5xl mt-2">
        {post.title}
      </h1>
      <style dangerouslySetInnerHTML={{ __html: gfm.CSS }} />
      <div
        class="mt-12 markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
