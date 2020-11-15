'use strict';

(() => {
  const uploadOverlay = document.querySelector(`.img-upload__overlay`);
  const effects = document.querySelector(`.effects__list`);
  const imgEffectLevel = document.querySelector(`.img-upload__effect-level`);


  const doOpenModal = () => {
    uploadOverlay.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    const defaultValue = effects.querySelector(`input[value = none]`);
    defaultValue.click();
    doScale(window.INITIAL_SCALE_FACTOR);
    imgEffectLevel.style.display = `none`;
  };
  window.openModal = {
    doOpenModal: doOpenModal
  };
})();
