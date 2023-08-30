export default (error) => {
  const errors = {
    'rssExist': 'feedbackMessages.rssExist',
    'Network Error': 'feedbackMessages.networkError',
    'urlInvalid': 'feedbackMessages.urlInvalid',
    'rssInvalid': 'feedbackMessages.rssInvalid',
    'unknown': 'feedbackMessages.unknownError',
  };

  return errors[error] ? errors[error] : errors['unknown'];
};
