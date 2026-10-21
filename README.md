# Конструктор лендингов (Vue)

[![hexlet-check](https://github.com/kicha3007-boop/vue-project-441/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/kicha3007-boop/vue-project-441/actions)
[![CI](https://github.com/kicha3007-boop/vue-project-441/actions/workflows/ci.yml/badge.svg)](https://github.com/kicha3007-boop/vue-project-441/actions/workflows/ci.yml)

Соберите конструктор посадочных страниц на Vue 3, в котором страница
складывается из блоков, блоки меняются местами и настраиваются, оформление
задаётся темой, а готовый результат выгружается HTML-файлом. По ходу вы разложите
состояние по хранилищу Pinia, разведёте экраны маршрутами Vue Router и
раздадите оформление вниз по дереву через provide/inject. Серверной части
у проекта нет, всё живёт в браузере.

Учебный проект Хекслета: https://ru.hexlet.io/programs/vue
Как это должно работать: https://files.hexlet.app/a/z2lj3r

## Стек

- Vue 3 (`<script setup>`), Pinia, Vue Router
- Vite, Tailwind CSS 4
- Vitest + @vue/test-utils, oxlint + oxfmt

Выложенное приложение: пока не выложено (Render, статический сайт: команда сборки
`make build`, каталог публикации `dist/`, правило перенаправления `/*` → `/index.html`).

## Установка

Нужен Node.js 24 или новее.

```bash
git clone https://github.com/kicha3007-boop/vue-project-441.git
cd vue-project-441
make setup   # зависимости и сборка в dist/
make serve   # собранное приложение на http://localhost:8080
```

## Использование

```bash
make start   # сервер разработки на http://localhost:8080
make test    # тесты хранилища, выгрузки и компонента страницы
make lint    # oxlint и проверка форматирования oxfmt
```

Экраны: `/` — главная, `/editor` — редактор (кнопки блоков, список, настройки, страница),
`/theme` — палитра, шрифт и ширина колонки, `/preview` — предпросмотр и выгрузка в HTML.
Страница сохраняется в `localStorage` и переживает перезагрузку.

## Устройство

- `src/lib/blockTypes.js` — справочник типов блоков: название и поля со значениями по умолчанию.
- `src/lib/blockComponents.js` — карта «тип — компонент», компоненты в `src/components/blocks/`.
- `src/lib/exportHtml.js` — чистая функция выгрузки, от Vue не зависит.
- `src/lib/theme.js` — палитры, шрифты, ширины и ключ `provide`/`inject`.
- `src/stores/page.js` — хранилище Pinia: блоки, выбранный блок, тема, сохранение одним `watch`.
- `src/texts.js` — тексты интерфейса.

Новый тип блока (здесь это `faq`, вопрос и ответ) добавляется в четырёх местах: справочник,
компонент блока, карта и разметка в выгрузке.

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
