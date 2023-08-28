const getPostsAndFeedGenerator = () => {
  let id = 1;

  return (xmlDoc) => {
    try {
      const feedHeader = xmlDoc.querySelector('title').textContent;
      const description = xmlDoc.querySelector('description').textContent;
      const items = xmlDoc.querySelectorAll('item');

      const posts = Array.from(items).map((item) => {
        const title = item.querySelector('title').textContent.trim();
        const description = item
          .querySelector('description')
          .textContent.trim();
        const link = item.querySelector('link').textContent.trim();

        return { id, title, description, link };
      });
      const feed = { id, feedHeader, description };
      id += 1;

      return { feed, posts };
    } catch {
      throw new Error('rssInvalid');
    }
  };
};

const generateObjectFromDom = getPostsAndFeedGenerator();

export default (data, format) => {
  const xmlParser = new DOMParser();

  switch (format) {
    case 'xml': {
      const xmlDom = xmlParser.parseFromString(data, 'text/xml');
      return generateObjectFromDom(xmlDom);
    }
    default:
      throw new Error(`Unknown data format ${format}`);
  }
};
