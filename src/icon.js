import Icon from '../icons/icon.png';

export default () => {
  const head = document.querySelector('head');
  const iconTag = document.createElement('link');
  iconTag.rel = 'icon';
  iconTag.href = Icon;
  head.appendChild(iconTag);
};
