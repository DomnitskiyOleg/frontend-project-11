const getRssObjectGenerator = () => {
  let id = 1;

  return (xmlDoc) => {
    const feedHeader = xmlDoc.querySelector('title').textContent;
    const description = xmlDoc.querySelector('description').textContent;
    const items = xmlDoc.querySelectorAll('item');
    const posts = Array.from(items).map((item) => {
      const title = item.querySelector('title').textContent.trim();
      const description = item.querySelector('description').textContent.trim();
      const link = item.querySelector('link').textContent.trim();
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
      const xmlDom = xmlParser.parseFromString(data, 'text/xml');
      return generateObjectFromDom(xmlDom);
    }
    default:
      throw new Error(`Unknown data format ${format}`);
  }
};
