# Бронфут.ком - фронтенд

# Требования

Node 18+  
npm 7+

# Установка

1.  Склонировать репозиторий
2.  Установить зависимоcти командой:

    `npm install` или `yarn install`

# Скрипты

- Дев сервер  
  `npm run dev`

- Превью  
  `npm run preview`

- Билд  
  `npm run build`

- Форматирование prettier  
  `npm run prettier`

- Запуск eslint  
  `npm run lint`

# Styleguide

- Названия функций, классов, комменты, коммиты - только на английском
- Если нужно отключить еслинт над какой-нибудь строчкой, надо написать коммент почему, и отключать его именно над этой строчкой
- Если хочется оставить туду (TODO) коммент в коде, то надо сделать тикет, и оставить ссылку на тикет, и запланировать время когда его делать. Если нельзя запланировать время, то туду убираем.
- Идентация пробелами. Проверить работает ли editorconfig: в любом файле убрать пустую строчку в конце файла и нажать Ctrl+S, пустая строка должна появиться опять.
- Публичные интерфейсы документируем с помощью jsdoc
- Нельзя оставлять закомменченный код

# Процесс

Делаем фичи максимально е2е, и потом мержим их. Например, на главной у нас есть две ссылки "зарегаться как заведение" и как "покупатель". Начнем с экранов для покупателя, и пока не будет экранов для заведения, то не будем добавлять ссылку "зарегаться как заведение".

Делаем ПР, ждем одного апрува, и тогда мержим. Соответственно, чужие ПРы тоже надо смотреть, и если не против, что этот код попадет в мастер, то апрувать.

Каждый ПР должен билдиться без ошибок.
