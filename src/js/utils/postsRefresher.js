import parse from './parser.js';
import getProxyUrl from './getProxyUrl.js';
import axios from 'axios';
import _ from 'lodash';

const postsRefresher = () => {
  let timerId;

  const startPostsRefresher = (oldPosts, feeds) => {
    const requests = feeds.map(({ url }) => axios.get(getProxyUrl(url)));

    Promise.all(requests)
      .then((responses) => {
        const xmlTexts = responses.map((responses) => responses.data.contents);
        const parsedData = _.zipWith(xmlTexts, feeds, (xml, { id }) => parse(xml, 'xml', id));
        const updatedPosts = parsedData.map(({ posts }) => posts).flat();

        updatedPosts.forEach((updatedPost) => {
          const filtered = oldPosts.filter(({ feedId }) => feedId === updatedPost.feedId);
          const found = filtered.find(({ title }) => title === updatedPost.title);
          if (!found) {
            console.log('bingooooooooooo!');
            oldPosts.push(updatedPost);
          }
        });

        timerId = setTimeout(() => startPostsRefresher(oldPosts, feeds), 5000);
      })
      .catch((e) => {
        console.error(e);
        startPostsRefresher(oldPosts, feeds);
      });
  };

  const stopPostsRefresher = () => clearInterval(timerId);

  return { startPostsRefresher, stopPostsRefresher };
};

const { startPostsRefresher, stopPostsRefresher } = postsRefresher();

export { startPostsRefresher, stopPostsRefresher };
