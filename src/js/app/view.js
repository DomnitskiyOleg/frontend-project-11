import onChange from 'on-change';
import {
  renderForm,
  renderFeeds,
  renderPosts,
  renderStaticTexts,
  renderSubmitInputAvailability,
  renderModal,
  renderVisitedPosts,
} from '../renders/rendering';

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
        renderVisitedPosts(watchedState, elements);
        break;
      case 'feeds':
        renderFeeds(watchedState, elements, i18n);
        break;
      case 'generalUi.postIdForModal':
        renderModal(watchedState, elements.modal, i18n, value);
        break;
      case 'generalUi.visitedPostsIds':
        renderVisitedPosts(watchedState, elements);
        break;
      default:
        break;
    }
  });
  return watchedState;
};
