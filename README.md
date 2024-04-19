[https://bronfood-com.github.io/front/](https://bronfood-com.github.io/front/) - Превью-билд из main бранча

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

- Форматирование prettier.
  `npm run prettier`

- Запуск eslint  
  `npm run lint`

Также это выполняется перед каждым коммитом при помощи pre-commit хуков. Чтобы проверить, работают ли пре-коммит хуки, нужно открыть любой ts/tsx файл, оставить там `;;` на последней строке, запустить `git commit`. Должен сработать хук, и преттиер должен убрать эти `;;`. Если не работает, то это важно пофиксить, а не то мы погрязнем в мерж-конфликтах.

## editorconfig

Нужно установить плагин editorconfig для IDE. Чтобы проверить работает он или нет: в любом файле удалить последнюю пустую строку и нажать Ctrl+S. Если editorconfig работает, то пустая строка должна появиться опять. Если не появилась, то это значит, что editorconfig не работает, и надо его чинить. Это важно чинить, иначе будет много мерж-конфликтов.

# Установка докер контейнера с бекендом

1.  Склонировать репозиторий
    `git clone https://github.com/bronfood-com/backend `

2.  Для запуска необходимо изменить .env: В поле DB_HOST нужно установить значение db
3.  `docker-compose -f infra/docker-compose.django_db.yml up -d`

# Styleguide

- Названия функций, классов, комменты, коммиты - только на английском
- Если нужно отключить еслинт над какой-нибудь строчкой, надо написать коммент почему, и отключать его именно над этой строчкой
- Если хочется оставить туду (TODO) коммент в коде, то надо сделать тикет, и оставить ссылку на тикет, и запланировать время когда его делать. Если нельзя запланировать время, то туду убираем.
- Идентация пробелами. Проверить работает ли editorconfig: в любом файле убрать пустую строчку в конце файла и нажать Ctrl+S, пустая строка должна появиться опять.
- Публичные интерфейсы документируем с помощью jsdoc
- Нельзя оставлять закомменченный код

# Процесс

Делаем фичи максимально е2е (end-to-end - и верстку, и логику, и бэк), и потом мержим их. Например, на главной у нас есть две ссылки "зарегаться как заведение" и как "покупатель". Начнем с экранов для покупателя, и пока не будет экранов для заведения, то не будем добавлять ссылку "зарегаться как заведение".

Делаем ПР, ждем одного апрува, и тогда мержим. Соответственно, чужие ПРы тоже надо смотреть, и если не против, что этот код попадет в мастер, то апрувать.

Каждый ПР должен билдиться без ошибок на CI.

Чтобы процесс ревью проходел быстрее, стоит делать ПРы удобными для ревью. Этому способствует:

- в описании указать намерение этого ПРа, чтобы было понятно, чего автор хочет добиться этими изменениями;
- посмотреть свой код еще раз, часто можно увидеть много штук, оставленных по невнимательности;
- убедиться, что нет мерж-конфликтов, что CI проходит, и что появилась ссылка на превью-билд;
- что ПР готов к мержу;
- каждый коммент должен быть отвечен - после того как фикс запушен. Даже если это ответы "да-да-пофиксил-пофиксил". Выглядит тупо, но это очень сильно помогает понимать что сделано, а что нет.

## Компоненты

В левой части фигмы расположена дизайн-система. Это набор компонентов, и дизайнер использует их на разных страницах.
Мы должны следовать за дизайнером в нашем использовании компоентов. Тогда мы будем говорить с ним на одном языке. И если он, например, поменяет в фигме шрифт у Reviews (выглядит как (4.8 ⭐ (123+)), шрифт поменяется у всех Reviews, и только у них.
Соответственно, и мы у себя в коде возьмем компоент Reviews и поменяем там шрифт, и будет эффект такой же, как и в фигме.

Большой ошибкой будет для нас решить, что Reviews и Menu_buttons похожи и сделать для них один компонент в нашем коде. В таком случае, дизайнеру в фигме будет легко менять шрифт отдельно для Reviews и Menu_buttons, а нам - практически невозможно. Поэтому, мы делим вещи на компоненты так же, как это сделали дизайнеры.

Имена у компонентов в фигме не особо удобные, но мы можем предлагать свои - несколько компонентов переименовали по нашей просьбе.

Сами компоненты мы имплементируем по мере востребования. По следующей схеме:

1. Допустим, я делаю Экран 1 и мне нужен компонент Reviews, и его еще нигде нет в приложении.
2. Тогда я прямо инлайном его и пишу в коде страницы, так, чтобы закончить таску с Экраном 1, не думая о том, что Reviews будет использоваться в других местах.
3. Допустим, потом мне в работу попал Экран 2, в котором тоже есть Reviews.
4. Я копирую этот код из Экрана 1 в Экран 2, и доделываю так, чтобы закончить таску с Экран 2.
5. Когда есть компонент визуально появился на двух экранах, тогда можно вырезать общий код в отдельный компоент и поместить его в папку components.

Делать наоборот - реюзабельный компонент еще до второго его появления на страницах - очень сложно. Придется угадывать, какие опции конфигурации понадобятся в будущем. Практика показывает, что скорее всего не угадаешь.

Еще, лучше не включать позиционирование внутрь компонентов. Лучше в том месте, в котором надо заюзать компонент, сделать div и задать ему позиционирование (grid, postion, top и т.п.).

## е2е фичи


В меине по максимуму должен быть полностью рабочий, с точки зрения юзера, функционал: и верстка, и логика, и бэк. Бывает, что нужно залить что-то, что еще не готово на 100% - такое решение надо принимать со скорбью в сердце, и обязательно нужно создать тикет чтобы доделать фичу до конца.

Частая проблема в разработке любого приложения - когда недоделанная фича усложняет жизнь и юзерам, и девелоперам. Зачем она нужна была - никто уже не помнит, а удалять - страшно, мало ли что-нибудь сломается. Хотя мы и строго следим, чтобы мержить только 100% готовые вещи, даже у нас время от времени обнаруживаются какие-то недоделки.
