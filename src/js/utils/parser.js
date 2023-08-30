let postId = 0;

const generatePostsAndFeed = (xmlDoc, id) => {
  try {
    const feedHeader = xmlDoc.querySelector('title').textContent;
    const description = xmlDoc.querySelector('description').textContent;
    const items = xmlDoc.querySelectorAll('item');
    const feed = { id, feedHeader, description };

    const posts = Array.from(items).map((item) => {
      const title = item.querySelector('title').textContent.trim();
      const description = item.querySelector('description').textContent.trim();
      const link = item.querySelector('link').textContent.trim();
      postId += 1;
      return { id: postId, feedId: id, title, description, link };
    });
    return { feed, posts };
  } catch {
    throw new Error('rssInvalid');
  }
};

export default (data, format, id) => {
  const xmlParser = new DOMParser();

  switch (format) {
    case 'xml': {
      const xmlDom = xmlParser.parseFromString(data, 'text/xml');
      return generatePostsAndFeed(xmlDom, id);
    }
    default:
      throw new Error(`Unknown data format ${format}`);
  }
};
