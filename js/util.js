'use strict';

(() => {
  window.getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
})();
