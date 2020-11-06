'use strict';

const MAX_PERCENT = 100;
const INITIAL_SCALE_FACTOR = `100`;
const MAX_HASHTAGS_LENGTH = 20;
const MAX_FOBOS = 3;
const MAX_BRIGHTNESS = 3;

const usersImg = document.querySelector(`.pictures`);
const template = document.querySelector(`#picture`).content.querySelector(`.picture`);
const uploadFile = document.querySelector(`#upload-file`);
const uploadOverlay = document.querySelector(`.img-upload__overlay`);
const imgPrevew = document.querySelector(`.img-upload__preview`);
const imgOverlayClose = document.querySelector(`#upload-cancel`);
const scaleBtnSmaller = document.querySelector(`.scale__control--smaller`);
const scaleBtnBigger = document.querySelector(`.scale__control--bigger`);
const scaleIndicator = document.querySelector(`.scale__control--value`);
const effects = document.querySelector(`.effects__list`);
const imgEffectLevel = document.querySelector(`.img-upload__effect-level`);
const effectLevelValue = document.querySelector(`.effect-level__value`);

const profilesNum = 25;
const userNames = [`Вася`, `Лена`, `Слава`, `Толя`, `Оля`, `Катя`];
const messages = [`Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getAvatar = () => `img/avatar-${getRandom(0, 6)}.svg`;
const getName = () => userNames[getRandom(0, userNames.length - 1)];
const getComments = (imgIndx) => {
  const temp = [];
  for (let i = 0; i < imgIndx * getRandom(0, 100); i++) {
    temp.push({
      avatar: getAvatar(),
      name: getName(),
      messages: messages[getRandom(0, messages.length - 1)]
    });
  }
  return temp;
};

const getProfiles = () => {
  const temp = [];
  for (let i = 0; i < profilesNum; i++) {
    temp.push({
      url: `photos/${i + 1}.jpg`,
      avatar: getAvatar(),
      name: getName(),
      likes: getRandom(15, 200),
      comments: getComments((i + 1))
    });
  }
  return temp;
};

const profiles = getProfiles();

const getProfileInf = (profileParam) => {

  let profileElement = template.cloneNode(true);

  profileElement.querySelector(`.picture__img`).src = profileParam.url;
  profileElement.querySelector(`.picture__comments`).textContent = profileParam.comments.length;
  profileElement.querySelector(`.picture__likes`).textContent = profileParam.likes;

  return profileElement;

};

const render = () => {

  let fragment = document.createDocumentFragment();

  for (let i = 0; i < profilesNum; i++) {
    fragment.appendChild(getProfileInf(profiles[i]));
  }

  usersImg.appendChild(fragment);
};

render();

/* задание 4.1 */

const doOpenModal = () => {
  uploadOverlay.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  const defaultValue = effects.querySelector(`input[value = none]`);
  defaultValue.click();
  doScale(INITIAL_SCALE_FACTOR);
  imgEffectLevel.style.display = `none`;
};

const doCloseModal = () => {
  uploadOverlay.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  uploadFile.value = ``;
};

uploadFile.addEventListener(`change`, () => {
  doOpenModal();
});

imgOverlayClose.addEventListener(`click`, () => {
  doCloseModal();
});

window.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    doCloseModal();
  }
});

const getCount = () => {
  const text = scaleIndicator.value;
  const prc = text.substring(0, text.length - 1);
  const num = Number(prc);
  return num === Number.NaN ? INITIAL_SCALE_FACTOR : num;
}

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
}


scaleBtnBigger.addEventListener(`click`, () => {
  doScale(scaleUp());
});


scaleBtnSmaller.addEventListener(`click`, () => {
  doScale(scaleDown());
});

const imgBigPic = document.querySelector(`.img-upload__preview`);

const filterStyle = {
  sepia: (levelOfEffects) => `sepia(${levelOfEffects / MAX_PERCENT})`,
  chrome: (levelOfEffects) => `grayscale(${levelOfEffects / MAX_PERCENT})`,
  marvin: (levelOfEffects) => `invert(${levelOfEffects}%)`,
  phobos: (levelOfEffects) => `blur(${levelOfEffects * MAX_FOBOS / MAX_PERCENT}px)`,
  heat: (levelOfEffects) => `brightness(${levelOfEffects * MAX_BRIGHTNESS / MAX_PERCENT})`,
  none: () => `none`
};

let setEffect = (evt) => {
  imgBigPic.classList.add(`effects__preview--${evt.target.value}`);
  const initialEffectValue = 100;
  let filterValue = evt.target.value;
  if (filterValue !== `none`) {
    imgEffectLevel.style.display = `block`;
  } else {
    imgEffectLevel.style.display = `none`;
  }
  effectLevelValue.value = initialEffectValue;
  imgPrevew.style.filter = filterStyle[filterValue](initialEffectValue);
};

let removeEffects = () => {
  const radioInputs = effects.querySelectorAll(`input:checked`);
  if (radioInputs.length === 1) {
    const selected = radioInputs[0];
    imgBigPic.classList.remove(`effects__preview--${selected.value}`);
  }
};

effects.addEventListener(`mousedown`, removeEffects, true);
effects.addEventListener(`change`, setEffect);

/* Валидация */

const textHashtagsInput = document.querySelector(`.text__hashtags`);

const getValidation = () => {
  const reg = /#[a-z]+/;
  let value = textHashtagsInput.value;
  let length = value.length;
  console.log(value)

  if (length > MAX_HASHTAGS_LENGTH) {
    textHashtagsInput.setCustomValidity(`Удалите лишние ${length - MAX_HASHTAGS_LENGTH} символов`);
  } else if (textHashtagsInput.setCustomValidity.tooShort) {
    textHashtagsInput.setCustomValidity(`Минимум 2 символа`);
  } else {
    textHashtagsInput.setCustomValidity(``);
  }
  textHashtagsInput.reportValidity(``);
};


textHashtagsInput.addEventListener(`input`, function () {
  getValidation();
});
