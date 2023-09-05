import axios from 'axios';
import _ from 'lodash';
import parse from './parser';
import setId from './setId';
import getProxyUrl from './getProxyUrl';

const startPostsRefresher = (oldPosts, feeds) => {
  const xmlPromises = feeds.map(({ url }) => axios.get(getProxyUrl(url))
    .then((response) => response.data.contents));

  Promise.all(xmlPromises)
    .then((xmlTexts) => {
      const parsedData = _.zipWith(xmlTexts, feeds, (xml, { id }) => {
        const { feed, posts } = parse(xml);
        return setId(feed, posts, id);
      });

      const updatedPosts = parsedData
        .map(({ postsWithId }) => postsWithId)
        .flat();

      updatedPosts.forEach((updatedPost) => {
        const filtered = oldPosts.filter(
          ({ feedId }) => feedId === updatedPost.feedId,
        );
        const found = filtered.find(({ title }) => title === updatedPost.title);

        if (!found) {
          oldPosts.push(updatedPost);
        }
      });
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      setTimeout(() => {
        startPostsRefresher(oldPosts, feeds);
      }, 5000);
    });
};
export default startPostsRefresher;
