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

export default (state, elements, i18n) => {
  renderStaticTexts(elements, i18n);

  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'test':
        break;
      case 'formStatus':
        validateForm(elements, state, i18n);
        break;
      default:
        break;
    }
  });
  return watchedState;
};
