import watch from './view.js';
import * as yup from 'yup';
import i18next from 'i18next';
import resources from '../locales/index.js';
import axios from 'axios';
import parse from '../utils/parser.js';
import getProxyUrl from '../getProxyUrl.js';
import getErrorMessage from '../handle errors/getErrorMessage.js';
import { startPostsRefresher, stopPostsRefresher } from '../utils/postsRefresher.js';

yup.setLocale({
  mixed: {
    notOneOf: () => 'rssExist',
  },
  string: {
    url: () => 'urlInvalid',
  },
});

const getSchema = (urls) => yup.string().trim().url().notOneOf(urls);

const app = () => {
  const urls = [];
  const elements = {
    header: document.querySelector('h1'),
    leader: document.querySelector('.lead'),
    example: document.querySelector('.example'),
    input: document.querySelector('#url-input'),
    label: document.querySelector('form label'),
    submitButton: document.querySelector('[type="submit"]'),
    form: document.querySelector('.rss-form'),
    feedback: document.querySelector('.feedback'),
    postsContainer: document.querySelector('.posts'),
    feedsContainer: document.querySelector('.feeds'),
  };

  const state = {
    formStatus: null,
    valid: null,
    feedbackMessage: null,
    feeds: [],
    posts: [],
    blockInputs: false,
  };

  const i18n = i18next.createInstance();
  let id = 1;

  i18n
    .init({
      lng: 'ru',
      debug: true,
      resources,
    })
    .then(() => {
      const watchedState = watch(state, elements, i18n);

      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        stopPostsRefresher();
        watchedState.blockInputs = true;
        watchedState.formStatus = 'checking';

        const formData = new FormData(e.target);
        const url = formData.get('url').trim();
        const schema = getSchema(urls);
        schema
          .validate(url)
          .then(() => axios.get(getProxyUrl(url)))
          .then((response) => {
            const parsedData = parse(response.data.contents, 'xml', id);
            const { feed, posts } = parsedData;
            watchedState.feeds.push({ ...feed, url });
            urls.push(url);

            const newPosts = [...posts, ...state.posts];

            watchedState.posts = newPosts;
            watchedState.valid = true;
            watchedState.feedbackMessage = 'feedbackMessages.rssAdded';
            id += 1;
            startPostsRefresher(watchedState.posts, watchedState.feeds);
          })
          .catch((e) => {
            watchedState.valid = false;
            const feedbackMessage = getErrorMessage(e.message);
            watchedState.feedbackMessage = feedbackMessage;
          })
          .finally(() => {
            watchedState.formStatus = 'checked';
            watchedState.formStatus = 'filling';
            watchedState.blockInputs = false;
          });
      });
    });
};
export default app;
