'use strict';

(() => {
  const MAX_PERCENT = 100;
  const scaleIndicator = document.querySelector(`.scale__control--value`);
  const scaleBtnSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleBtnBigger = document.querySelector(`.scale__control--bigger`);
  const imgPrevew = document.querySelector(`.img-upload__preview`);
  const INITIAL_SCALE_FACTOR = `100`;

  const getCount = () => {
    const text = scaleIndicator.value;
    const prc = text.substring(0, text.length - 1);
    const num = Number(prc);
    return num === Number.NaN ? INITIAL_SCALE_FACTOR : num;
  };

  const scaleUp = () => {
    let count = getCount();
    if (count < 100) {
      (count += 25);
    }
    return count;
  };

  const scaleDown = () => {
    let count = getCount();
    if (count > 25) {
      (count -= 25);
    }
    return count;
  };

  const doScale = (value) => {
    scaleIndicator.value = `${value}%`;
    imgPrevew.style.transform = `scale(${value / MAX_PERCENT}`;
  };


  scaleBtnBigger.addEventListener(`click`, () => {
    doScale(window.scaleUp());
  });


  scaleBtnSmaller.addEventListener(`click`, () => {
    doScale(window.scaleDown());
  });

  window.counter = {
    getCount,
    scaleUp,
    scaleDown
  };

  ;
})();
