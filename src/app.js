import watch from './view.js';
import * as yup from 'yup';

const getSchema = (urls) =>
  yup
    .string()
    .url('Ссылка должна быть валидным URL')
    .notOneOf(urls, 'RSS уже существует');

const app = () => {
  const elements = {
    input: document.querySelector('#url-input'),
    submitButton: document.querySelector('[type="submit"]'),
    form: document.querySelector('.rss-form'),
    feedback: document.querySelector('.feedback'),
  };

  const state = {
    formStatus: null,
    valid: null,
    message: null,
    urls: [],
  };

  const watchedState = watch(state, elements);
  watchedState.status = 'filling';

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const schema = getSchema(state.urls);

    schema
      .validate(url)
      .then(() => {
        watchedState.urls.push(url);
        watchedState.message = 'RSS успешно загружен';
        watchedState.valid = true;
      })
      .catch((e) => {
        watchedState.message = e.message;
        watchedState.valid = false;
      });
  });
};
export default app;
