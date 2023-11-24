# Вход и регистрация

### Экраны
1. Регистрация
2. Вход
3. Подтверждение номера
4. Успешная регистрация
5. Восстановление пароля
6. Установка нового пароля
7. Успешное восстановление пароля
8. Выход


### Компоненты из дизайн системы
- Button(Primary)
- Button(Default)
- Button(Secondary)
- Input(Default)
- Input(Error)
- Input_code(Default)
- Input_code(Active)
- Alert(Error)
- Button_password(Default)
- Button_password(Active)
- Icon(Close)
- Icon(Search)
- Icon(Menu)
- Icon(Favorite(Defautl))
- Icon(Navigation(Default))
- Edit(Hide)
- Edit(Show)


### Контракты с бэком
запрос на логин, ошибка или успех  
запрос на регистрацию, ошибка или успех  
запрос изменение пароля, ошибка или успех  
если успех запрос на смс-подтверждение, ошибка или успех

# Редактирование профиля
### Экраны
1. Раскрытое меню
2. Редактирование профиля
3. Изменение реквизитов
4. Подтверждение номера


### Компоненты из дизайн системы
- Button(Primary)
- Input(Active)
- Input(password_Default)
- Checkbox(Square)
- Search(Default)
- Tags(Default)

### Контракты с бэком
запрос на смену реквизитов, ошибка или успех  
запрос на редактирование профиля, ошибка или успех  
если успех запрос на смс-подтверждение, ошибка или успех

# Главная рестораны
### Экраны
1. Список ресторанов
2. Фильтры
3. Избранное
4. Подтверждение удаления

### Компоненты из дизайн системы
- Button(Primary)
- Button(Secondary)
- Button(Outline(Default))
- Button(Outline(Active))
- Icon(Navigation(Default))
- Icon(Navigation(Active))
- Delete(Delete)
- Icon(Filter)
- Icon(Close)
- Box(Default)
- Box_(Default)
- Reviews(Default)
- Labels(Navigation)
- Labels(Time)

### Контракты с бэком
запрос на получение списка ресторанов, ошибка или успех
запрос на получение данных о ресторане, ошибка или успех  
запрос на удаление ресторана из избарнного, ошибка или успех  

# Заведение
### Экраны
1. Список блюд
2. Опции блюда
3. Корзина
4. Очистить корзину
5. Пустая корзина
6. Оплата
7. Подтверждение платежа
8. Ожидание подтверждения
9. Состав заказа
10. Отмена заказа
11. Успешная отмена
12. Отзыв
13. Успешный отзыв

### Компоненты из дизайн системы
- Button(Primary)
- Button(Secondary)
- Button(Outline(Default))
- Button(Outline(Active))
- Delete(Favorite)
- Delete(Close)
- Delete(Back)
- Icon(Back)
- Icon(Close)
- Box Food(Default)
- Box(Default)
- bascket(Default)
- Header(Add)
- Reviews(Default)
- Labels(Navigation)
- Labels(Time)
- menu_button(Default)
- Stepper(Defautl) самый левый
- checkbox_text(Default)
- Input(Default)
- Progress Bar(Default)
- Progress Bar(Solid Line)
- Star Solid Full (Default)

### Контракты с бэком
запрос на удаление ресторана из избранного, ошибка или успех  
запрос на получение данных о ресторане, ошибка или успех 
запрос на добавление заказа, ошибка или успех
запрос на оплату заказа, ошибка или успех
если успех запрос на смс-подтверждение, ошибка или успех
запрос на добавление отзыва, ошибка или успех
запрос на получение текущего статуса заказа, ошибка или успех
запрос на отмену заказа, ошибка или успех
