import watch from './view.js';
import * as yup from 'yup';
import i18next from 'i18next';
import resources from './locales/index.js';

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
  };

  const state = {
    formStatus: null,
    valid: null,
    feedbackMessage: null,
    urls: [],
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
        const formData = new FormData(e.target);
        const url = formData.get('url').trim();
        const schema = getSchema(state.urls);
        console.log(watchedState);
        schema
          .validate(url)
          .then(() => {
            watchedState.urls.push(url);
            watchedState.feedbackMessage = 'feedbackMessages.rssAdded';
            watchedState.valid = true;
          })
          .catch((e) => {
            watchedState.feedbackMessage = e.message;
            watchedState.valid = false;
          })
          .finally(() => {
            console.log(state.urls);
            watchedState.formStatus = 'checking';
            watchedState.formStatus = 'filling';
          });
      });
    });
};
export default app;
