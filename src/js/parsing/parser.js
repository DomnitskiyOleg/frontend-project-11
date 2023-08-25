const getRssObjectGenerator = () => {
  let id = 1;

  return (htmlDom) => {
    const feedHeader = htmlDom.querySelector('title').textContent;
    const description = htmlDom.querySelector('description').textContent;
    const items = htmlDom.querySelectorAll('item');

    const posts = Array.from(items).map((item) => {
      const title = item.querySelector('title').textContent.trim();
      const description = item.querySelector('description').textContent.trim();
      const link = item.querySelector('link').nextSibling;
      return { id, title, description, link };
    });
    const feed = { id, feedHeader, description };
    id += 1;

    return { feed, posts };
  };
};
const generateObjectFromDom = getRssObjectGenerator();

export default (data, format) => {
  const xmlParser = new DOMParser();

  switch (format) {
    case 'xml': {
      const htmlDom = xmlParser.parseFromString(data, 'text/html');
      return generateObjectFromDom(htmlDom);
    }
    default:
      throw new Error(`Unknown data format ${format}`);
  }
};
