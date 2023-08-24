const getRssObject = (htmlDom) => {
  const feedHeader = htmlDom.querySelector('title').textContent;
  const description = htmlDom.querySelector('description').textContent;
  console.log(htmlDom);
};

export default (data, format) => {
  const xmlParser = new DOMParser();

  switch (format) {
    case 'xml': {
      const htmlDom = xmlParser.parseFromString(data, 'text/html');
      getRssObject(htmlDom);
      break;
    }
    default:
      throw new Error(`Unknown data format ${format}`);
  }
};
