export const renderFeeds = (state, elements, i18n) => {
  const { feedsContainer } = elements;

  const feedsHeader = document.createElement('h2');
  const feedsCard = document.createElement('div');
  const feedsCardBody = document.createElement('div');
  const feedsUl = document.createElement('ul');

  feedsHeader.classList.add('h4', 'card-title');
  feedsHeader.textContent = i18n.t('feedsHeader');
  feedsCard.classList.add('card', 'border-0');
  feedsCardBody.classList.add('card-body');
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

export const renderPosts = (state, elements, i18n) => {
  const { postsContainer } = elements;
  const postsHeader = document.createElement('h2');
  const postsCard = document.createElement('div');
  const postsCardBody = document.createElement('div');
  const postsUl = document.createElement('ul');

  postsHeader.classList.add('h4', 'card-title');
  postsHeader.textContent = i18n.t('postsHeader');
  postsCard.classList.add('card', 'border-0');
  postsCardBody.classList.add('card-body');
  postsUl.classList.add('list-group', 'border-0', 'rounded-0');

  state.posts.forEach(({ title, link, id }) => {
    const li = document.createElement('li');
    li.classList.add(
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'list-group-item',
      'border-0',
      'border-end-0',
    );
    const a = document.createElement('a');
    const button = document.createElement('button');

    a.classList.add('fw-bold');
    a.href = link;
    a.textContent = title;
    a.dataset.id = id;

    button.dataId = id;
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.textContent = i18n.t('previewButton');
    button.dataset.id = id;
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#modal';
    button.addEventListener('click', () => {});
    li.append(a, button);
    postsUl.append(li);
  });

  postsCardBody.append(postsHeader);
  postsCard.append(postsCardBody, postsUl);
  postsContainer.replaceChildren(postsCard);
};

export const renderStaticTexts = (elements, i18n) => {
  const { header, input, leader, example, submitButton, label } = elements;

  header.textContent = i18n.t('header');
  input.placeholder = i18n.t('label');
  leader.textContent = i18n.t('leader');
  example.textContent = i18n.t('example');
  submitButton.textContent = i18n.t('submitButton');
  label.textContent = i18n.t('label');
};

const handleFeedback = (state, form, feedback, input, i18n) => {
  switch (state.formUi.valid) {
    case true:
      feedback.classList.replace('text-danger', 'text-success');
      form.reset();
      input.focus();
      feedback.textContent = i18n.t(state.formUi.feedbackMessage);
      break;
    case false:
      {
        const message = state.formUi.feedbackMessage;
        if (message === 'feedbackMessages.urlInvalid') {
          input.classList.add('is-invalid');
        }
        feedback.textContent = i18n.t(state.formUi.feedbackMessage);
        feedback.classList.replace('text-success', 'text-danger');
      }
      break;
    default:
      break;
  }
};

export const renderForm = (elements, state, i18n) => {
  const { form, input, feedback } = elements;

  switch (state.formUi.formStatus) {
    case 'checked':
      handleFeedback(state, form, feedback, input, i18n);
      break;
    case 'checking':
      feedback.textContent = '';
      input.classList.remove('is-invalid');
      break;
  }
};

export const renderSubmitInputAvailability = (elements, value) => {
  const { input, submitButton } = elements;
  input.readOnly = value;
  submitButton.disabled = value;
};
