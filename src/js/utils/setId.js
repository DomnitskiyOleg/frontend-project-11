let postId = 1;

const setId = (feed, posts, id) => {
  const feedWithId = { ...feed, id };
  const postsWithId = posts.map((post) => {
    const newPost = { ...post, id: postId, feedId: id };
    postId += 1;
    return newPost;
  });
  return { feedWithId, postsWithId };
};
export default setId;
