import onChange from 'on-change';

const renderStaticTexts = (elements, i18n) => {
  const { header, input, leader, example, submitButton, label } = elements;

  header.textContent = i18n.t('header');
  input.placeholder = i18n.t('label');
  leader.textContent = i18n.t('leader');
  example.textContent = i18n.t('example');
  submitButton.textContent = i18n.t('submitButton');
  label.textContent = i18n.t('label');
};

const validateForm = (elements, state, i18n) => {
  const { form, input, feedback } = elements;
  switch (state.valid) {
    case true:
      input.classList.remove('is-invalid');
      feedback.classList.replace('text-danger', 'text-success');
      form.reset();
      input.focus();
      feedback.textContent = i18n.t(state.feedbackMessage);
      break;
    case false:
      console.log(state.feedbackMessage);
      input.classList.add('is-invalid');
      feedback.textContent = i18n.t(state.feedbackMessage);
      feedback.classList.replace('text-success', 'text-danger');
      break;
    default:
      break;
  }
};

const renderFeeds = (state, elements, i18n) => {
  const { postsContainer, feedsContainer } = elements;

  const feedsHeader = document.createElement('h2');
  const postsHeader = document.createElement('h2');
  feedsHeader.classList.add('h4', 'card-title');
  postsHeader.classList.add('h4', 'card-title');
  feedsHeader.textContent = i18n.t('feedsHeader');
  postsHeader.textContent = i18n.t('postsHeader');

  const postsCard = document.createElement('div');
  const postsCardBody = document.createElement('div');
  const postsUl = document.createElement('ul');

  const feedsCard = document.createElement('div');
  const feedsCardBody = document.createElement('div');
  const feedsUl = document.createElement('ul');

  postsCard.classList.add('card', 'border-0');
  feedsCard.classList.add('card', 'border-0');
  postsCardBody.classList.add('card-body');
  feedsCardBody.classList.add('card-body');
  postsUl.classList.add('list-group', 'border-0', 'rounded-0');
  feedsUl.classList.add('list-group', 'border-0', 'rounded-0');

  state.feeds.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const header = document.createElement('h3');
    header.classList.add('h6', 'm-0');
    const paragr = document.createElement('p');
    paragr.classList.add('m-0', 'small', 'text-black-50');

    header.textContent = feed.feedHeader;
    paragr.textContent = feed.description;

    li.append(header, paragr);
    feedsUl.append(li);
  });

  feedsCardBody.append(feedsHeader);
  feedsCard.append(feedsCardBody, feedsUl);
  feedsContainer.replaceChildren(feedsCard);
};

export default (state, elements, i18n) => {
  renderStaticTexts(elements, i18n);

  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'ptest':
        break;
      case 'formStatus':
        validateForm(elements, state, i18n);
        break;
      case 'posts':
        renderFeeds(state, elements, i18n);
        break;
      default:
        break;
    }
  });
  return watchedState;
};
