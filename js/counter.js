'use strict';

(() => {
  const scaleIndicator = document.querySelector(`.scale__control--value`);
  const scaleBtnSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleBtnBigger = document.querySelector(`.scale__control--bigger`);
  // const imgPrevew = document.querySelector(`.img-upload__preview`);
  let newScaleListener = undefined;
  const INITIAL_SCALE_FACTOR = `100`;

  const registerScaleListener = (listener) => {
    newScaleListener = listener;
  };

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
    if (typeof (newScaleListener) !== `undefined`) {
      newScaleListener(value);
    }
  };


  scaleBtnBigger.addEventListener(`click`, () => {
    doScale(scaleUp());
  });


  scaleBtnSmaller.addEventListener(`click`, () => {
    doScale(scaleDown());
  });

  window.counter = {
    registerScaleListener
  };
})();
