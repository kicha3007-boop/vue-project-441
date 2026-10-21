// Справочник типов блоков: название для кнопки добавления и поля
// со значениями по умолчанию. Хранилище, форма настроек и компонент страницы
// читают типы только отсюда и про конкретные типы не знают.
export const blockTypes = {
  hero: {
    label: "Приветствие",
    fields: {
      title: { label: "Заголовок", default: "Заголовок вашего лендинга" },
      subtitle: { label: "Подзаголовок", default: "Одно предложение о том, что вы предлагаете" },
    },
  },
  features: {
    label: "Преимущества",
    fields: {
      heading: { label: "Заголовок раздела", default: "Почему выбирают нас" },
      items: {
        label: "Пункты, по одному в строке",
        default: "Быстрый старт\nПонятные цены\nПоддержка без выходных",
        multiline: true,
      },
    },
  },
  cta: {
    label: "Призыв к действию",
    fields: {
      text: { label: "Текст призыва", default: "Готовы попробовать?" },
      buttonLabel: { label: "Надпись на кнопке", default: "Оставить заявку" },
    },
  },
  faq: {
    label: "Вопрос и ответ",
    fields: {
      question: { label: "Вопрос", default: "Сколько стоит подключение?" },
      answer: {
        label: "Ответ",
        default: "Подключение бесплатное.\nПлатите только за выбранный тариф.",
        multiline: true,
      },
    },
  },
};

export const isKnownType = (type) => Object.hasOwn(blockTypes, type);

export const fieldsOf = (type) =>
  Object.entries(blockTypes[type].fields).map(([name, field]) => ({ name, ...field }));

export const defaultFields = (type) =>
  Object.fromEntries(fieldsOf(type).map((field) => [field.name, field.default]));

// Многострочные поля превращаются в пункты: по строке на пункт, пустые пропускаются.
export const splitLines = (text) =>
  String(text)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");
