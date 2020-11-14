'use strict';

(() => {
  const getAvatar = () => `img/avatar-${window.getRandom(0, 6)}.svg`;

  window.userAvatar = {
    getAvatar: getAvatar
  };
})();
