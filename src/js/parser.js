import axios from 'axios';

axios
  .get(
    'https://reqbin.com/code/javascript/h6wipkyl/javascript-parse-xml-example',
  )
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
export default (data, format) => {
  const xmlParser = new DOMParser();

  switch (format) {
    case 'xml':
      return xmlParser.parseFromString(data);
    default:
      throw new Error(`Unknown data format ${format}`);
  }
};
