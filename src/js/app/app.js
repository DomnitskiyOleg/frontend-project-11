import watch from './view.js';
import * as yup from 'yup';
import i18next from 'i18next';
import resources from '../locales/index.js';
import axios from 'axios';
import parse from '../parsing/parser.js';
import getProxyUrl from '../getProxyUrl.js';

yup.setLocale({
  mixed: {
    notOneOf: () => 'feedbackMessages.rssExist',
  },
  string: {
    url: () => 'feedbackMessages.rssInvalid',
  },
});

const getSchema = (urls) => yup.string().trim().url().notOneOf(urls);

const app = () => {
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
    urls: [],
    feeds: [],
    posts: [],
    blockInputs: false,
  };

  const i18n = i18next.createInstance();

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
        watchedState.blockInputs = true;
        const formData = new FormData(e.target);
        const url = formData.get('url').trim();
        const schema = getSchema(state.urls);
        schema
          .validate(url)
          .then(() => axios.get(getProxyUrl(url)))
          .then((response) => {
            console.log(response);
            const parsedData = parse(response.data.contents, 'xml');
            const { feed, posts } = parsedData;
            watchedState.feeds.push(feed);
            state.urls.push(url);

            const filteredPosts = state.posts.filter(
              ({ id }) => id !== feed.id,
            );
            const newPosts = [...posts, ...filteredPosts];

            watchedState.posts = newPosts;
            watchedState.valid = true;
            watchedState.feedbackMessage = 'feedbackMessages.rssAdded';
          })
          .catch((e) => {
            watchedState.valid = false;
          })
          .finally(() => {
            watchedState.formStatus = 'checking';
            watchedState.formStatus = 'filling';
            watchedState.blockInputs = false;
            console.log(state);
          });
      });
    });
};
export default app;
