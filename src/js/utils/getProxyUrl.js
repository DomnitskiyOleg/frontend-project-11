export default (url) => {
  const base = 'https://allorigins.hexlet.app';
  const pathName = '/get';
  const encodedUrl = `${encodeURIComponent(url)}`;
  const search = `disableCache=true&url=${encodedUrl}`;
  const request = new URL(pathName, base);
  request.search = search;

  return request;
};
