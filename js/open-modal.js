'use strict';

((document) => {
  // const uploadOverlay = document.querySelector(`.img-upload__overlay`);
  // const effects = document.querySelector(`.effects__list`);
  // const imgEffectLevel = document.querySelector(`.img-upload__effect-level`);


  const doOpenModal = () => {
    document.uploadOverlay.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    const defaultValue = document.effects.querySelector(`input[value = none]`);
    defaultValue.click();
    document.doScale(document.INITIAL_SCALE_FACTOR);
    document.imgEffectLevel.style.display = `none`;
  };
  window.openModal = {
    doOpenModal: doOpenModal
  };
})(window);
