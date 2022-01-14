# React Mail List :metal:

### Подписка на обновления, реализованная с помощью React, Netlify Functions и Google Sheets

[Демо приложения](https://mail-list.netlify.app)

## Инструменты

- Netlify CLI - требуется глобальная установка
- Dotenv
- Google Spreadsheet
- Nodemailer
- React
- React DOM
- React Google Recaptcha
- Semantic UI CSS & Semantic UI React

## Структура

```
- functions
  - subscribe.js - лямбда-функция для отправки пользовательских данных в таблицу
  - unsubscribe.js - функция для отписки от уведомлений
- public
  - index.html - шаблон разметки
  - _redirects - настройка для правильной работы SPA на Netlify
- send-mail
  - index.js - скрипт для автоматической отправки сообщений
  - message.js - шаблон сообщения
- src
  - hooks
    - index.js - агрегация хуков
    - useDeferedRoute.js - хук для отложенной маршрутизации
    - useTimeout.js - обертка для setTimeout
  - Home.js - главная страница
  - NotFound.js - страница ошибки 404
  - Subscribe.js - страница подписки
  - Unsubscribe.js - страница отписки
  - Success.js - страница благодарности за подписку
  - App.js - основной компонент приложения
  - index.js - главный файл приложения, входная точка для Webpack
  - index.css - правка стилей Semantic
- .env.example - пример .env
- netlify.toml - настройки для netlify-cli
```
