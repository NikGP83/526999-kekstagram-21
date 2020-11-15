'use strict';

(() => {
  const scaleIndicator = document.querySelector(`.scale__control--value`);
  window.INITIAL_SCALE_FACTOR = `100`;

  const getCount = () => {
    const text = scaleIndicator.value;
    const prc = text.substring(0, text.length - 1);
    const num = Number(prc);
    return num === Number.NaN ? window.INITIAL_SCALE_FACTOR : num;
  };

  window.counter = {
    getCount: getCount
  }

  window.scaleUp = () => {
    let count = getCount();
    if (count < 100) {
      (count += 25);
    }
    return count;
  };

  window.scaleDown = () => {
    let count = getCount();
    if (count > 25) {
      (count -= 25);
    }
    return count;
  };
})();
