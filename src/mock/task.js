import {COLORS} from "../const.js";
import {getRandomInteger, getRandomArrayElement} from "../utils/common.js";

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
    `Посмотреть лекцию`,
    `Помечтать о сертификате`,
  ];

  return getRandomArrayElement(descriptions);
};

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return currentDate;
};

const generateRepeating = () => {
  return {
    mo: Boolean(getRandomInteger(0, 1)),
    tu: false,
    we: false,
    th: Boolean(getRandomInteger(0, 1)),
    fr: false,
    sa: false,
    su: false
  };
};

const generateColor = () => {
  return getRandomArrayElement(COLORS);
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    id: generateId(),
    description: generateDescription(),
    dueDate,
    repeating,
    color: generateColor(),
    isArchive: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
