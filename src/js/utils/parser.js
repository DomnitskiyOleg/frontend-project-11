export default (data) => {
  const xmlParser = new DOMParser();

  try {
    const xmlDoc = xmlParser.parseFromString(data, 'text/xml');
    const feedHeader = xmlDoc.querySelector('title').textContent;
    const description = xmlDoc.querySelector('description').textContent;
    const items = xmlDoc.querySelectorAll('item');
    const feed = { feedHeader, description };

    const posts = Array.from(items).map((item) => {
      const title = item.querySelector('title').textContent.trim();
      const postDescription = item
        .querySelector('description')
        .textContent.trim();

      const link = item.querySelector('link').textContent.trim();

      return {
        title,
        description: postDescription,
        link,
      };
    });

    return { feed, posts };
  } catch {
    throw new Error('rssInvalid');
  }
};
