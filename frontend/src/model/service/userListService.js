import {
  createEvent,
  createStore,
  createEffect,
  combine,
  sample,
} from "effector";

const nextPost = createEvent();

const getCommentsFx = createEffect(async (postId) => {
  const url = `posts/${postId}/comments`;
  const base = "https://jsonplaceholder.typicode.com";
  const req = await fetch(`${base}/${url}`);
  return req.json();
});

const $postComments = createStore([]).on(
  getCommentsFx.doneData,
  (_, comments) => comments,
);

// @ts-ignore
const $currentPost = createStore(1).on(
  getCommentsFx.done,
  (_, { params: postId }) => postId,
);

const $status = combine(
  $currentPost,
  $postComments,
  getCommentsFx.pending,
  (postId, comments, isLoading) =>
    isLoading
      ? "Loading post..."
      : `Post ${postId} has ${comments.length} comments`,
);

// @ts-ignore
sample({
  // @ts-ignore
  source: $currentPost,
  clock: nextPost,
  fn: (postId) => postId + 1,
  target: getCommentsFx,
});

$status.watch((status) => {
  console.log(status);
});
// => Post 1 has 0 comments

nextPost();

// => Loading post...
// => Post 2 has 5 comments
