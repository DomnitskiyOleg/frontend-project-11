import onChange from 'on-change';
import {
  renderForm,
  renderFeeds,
  renderPosts,
  renderStaticTexts,
  renderSubmitInputAvailability,
  renderModal,
  renderVisitedPosts,
} from '../renders/rendering.js';

export default (state, elements, i18n) => {
  renderStaticTexts(elements, i18n);

  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'formUi.blockInputs':
        renderSubmitInputAvailability(elements, value);
        break;
      case 'formUi.formStatus':
        renderForm(elements, state, i18n);
        break;
      case 'posts':
        renderPosts(watchedState, elements, i18n);
        break;
      case 'feeds':
        renderFeeds(watchedState, elements, i18n);
        break;
      case 'modalUi.postId':
        renderModal(watchedState, elements.modal, i18n, value);
        break;
      case 'postsUi.visitedPostsId':
        renderVisitedPosts(watchedState, elements);
        break;
      default:
        break;
    }
  });
  return watchedState;
};
