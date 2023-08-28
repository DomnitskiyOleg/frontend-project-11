import onChange from 'on-change';
import {
  renderForm,
  renderFeeds,
  renderPosts,
  renderStaticTexts,
  renderSubmitInputAvailability,
} from '../renders/rendering.js';

export default (state, elements, i18n) => {
  renderStaticTexts(elements, i18n);

  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'blockInputs':
        renderSubmitInputAvailability(elements, value);
        break;
      case 'formStatus':
        renderForm(elements, state, i18n);

        break;
      case 'posts':
        renderFeeds(state, elements, i18n);
        renderPosts(state, elements, i18n);
        break;
      default:
        break;
    }
  });
  return watchedState;
};
