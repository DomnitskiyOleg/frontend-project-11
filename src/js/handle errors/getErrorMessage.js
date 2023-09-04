export default (error) => {
  const errors = {
    rssExist: 'feedbackMessages.rssExist',
    network: 'feedbackMessages.networkError',
    urlInvalid: 'feedbackMessages.urlInvalid',
    rssInvalid: 'feedbackMessages.rssInvalid',
    unknown: 'feedbackMessages.unknownError',
  };

  return errors[error] ? errors[error] : errors.unknown;
};
