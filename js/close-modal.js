'use strict';

((document) => {
  const doCloseModal = () => {
    document.uploadOverlay.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.uploadFile.value = ``;
  };

  window.closeModal = {
    doCloseModal: doCloseModal
  };

  window.addEventListener(`keydown`, (evt) => {
    if (document.textDescriptionInput === document.activeElement) {
      return evt;
    } else if (document.textHashtagsInput === document.activeElement) {
      return evt;
    } else if (evt.key === `Escape`) {
      evt.preventDefault();
      doCloseModal();
    }
    return evt;
  });
})(window);
