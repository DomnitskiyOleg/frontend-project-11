import onChange from 'on-change';

export default (state, elements) => {
  const { form, input, feedback } = elements;

  const validateForm = (status) => {
    switch (status) {
      case true:
        input.classList.remove('is-invalid');
        feedback.classList.replace('text-danger', 'text-success');
        form.reset();
        input.focus();
        feedback.textContent = watchedState.message;
        break;
      case false:
        input.classList.add('is-invalid');
        console.log(watchedState.message);
        feedback.textContent = watchedState.message;
        feedback.classList.replace('text-success', 'text-danger');
        break;
      default:
        break;
    }
  };

  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'valid':
        validateForm(value);
        break;
      case 'status':
        break;
      default:
        break;
    }
  });
  return watchedState;
};
