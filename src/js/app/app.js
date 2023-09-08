import axios from 'axios';
import * as yup from 'yup';
import i18next from 'i18next';
import watch from './view';
import resources from '../locales/index';
import parse from '../utils/parser';
import setId from '../utils/setId';
import getProxyUrl from '../utils/getProxyUrl';
import getErrorMessage from '../handle errors/getErrorMessage';
import startPostsRefresher from '../utils/postsRefresher';
import 'bootstrap/dist/js/bootstrap.min';

const app = () => {
  yup.setLocale({
    mixed: {
      notOneOf: () => 'rssExist',
    },
    string: {
      url: () => 'urlInvalid',
    },
  });

  const baseSchema = yup.string().trim().url();
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
    modal: document.querySelector('#modal'),
  };

  const initialState = {
    formUi: {
      formStatus: 'idle',
      isValid: false,
      feedbackMessage: null,
    },
    generalUi: {
      visitedPostsIds: new Set(),
      postIdForModal: null,
    },
    feeds: [],
    posts: [],
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
      const watchedState = watch(initialState, elements, i18n);

      elements.postsContainer.addEventListener('click', (event) => {
        const tag = event.target.tagName;

        if (tag === 'BUTTON' || tag === 'A') {
          const postId = event.target.dataset.id;
          const { visitedPostsIds } = watchedState.generalUi;

          watchedState.generalUi.postIdForModal = postId;
          visitedPostsIds.add(postId);
        }
      });

      elements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        watchedState.formUi.formStatus = 'checking';

        const formData = new FormData(event.target);
        const url = formData.get('url').trim();
        const urls = watchedState.feeds.map((feed) => feed.url);

        baseSchema.notOneOf(urls)
          .validate(url)
          .then(() => axios.get(getProxyUrl(url)))
          .then((response) => {
            const { feed, posts } = parse(response.data.contents);
            const { feedWithId, postsWithId } = setId(feed, posts, id);

            postsWithId.forEach((post) => watchedState.posts.push(post));
            watchedState.feeds.push({ ...feedWithId, url });
            watchedState.formUi.isValid = true;
            watchedState.formUi.feedbackMessage = 'feedbackMessages.rssAdded';
            id += 1;
          })
          .catch((e) => {
            watchedState.formUi.isValid = false;
            const feedbackMessage = e.message === 'Network Error'
              ? getErrorMessage('network')
              : getErrorMessage(e.message);
            watchedState.formUi.feedbackMessage = feedbackMessage;
          })
          .finally(() => {
            watchedState.formUi.formStatus = 'checked';
          });
      });
      startPostsRefresher(watchedState.posts, watchedState.feeds);
    });
};
export default app;
