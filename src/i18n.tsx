import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            ru: {
                translation: {
                    components: {
                        guestNavigation: {
                            signUpAsABuyer: 'Зарегистрироваться как покупатель',
                            signIn: 'Войти',
                            aboutService: 'О сервисе',
                        },
                        header: {
                            burgerTitleHover: 'Меню',
                            placeName: 'Алматы',
                            favouritesTitleHover: 'Избранное',
                            basketTitleHover: 'Корзина',
                            logoTitleHover: 'Bronfood',
                            buttonCloseTitleHover: 'Закрыть',
                            searchTitleHover: 'Поиск',
                        },
                        inputPhone: {
                            required: 'Обязательное поле',
                            invalidPhoneNumberFormat: 'Неверный ввод',
                            phoneNumber: 'Телефон',
                        },
                        inputPassword: {
                            required: 'Обязательное поле',
                            errorMessage: 'Неверный ввод. Только латинские буквы, цифры и символы - !@#$%^&*()-_+=<>?',
                            minLengthErrorMessage: 'Минимальное количество символов -',
                            maxLengthErrorMessage: 'Максимальное количество символов - ',
                        },
                        input: {
                            required: 'Обязательное поле',
                            errorMessage: 'Неверный ввод',
                        },
                        passwordRecovery: {
                            title: 'Восстановить пароль',
                            phoneNumber: 'Телефон',
                            placeholder: '+7 (***)',
                            continue: 'Далее',
                            serverDoesntRespond: 'Сервер не отвечает. Попытайтесь еще раз позже',
                            validationError: 'Введен некорректный номер телефона.',
                            userWithThatPhoneNotFound: 'Пользователь с данным номером телефона не существует.',
                        },

                        newPassword: {
                            title: 'Придумайте новый пароль',
                            nameLabel: 'Новый пароль',
                            nameLabelRepeat: 'Повторите пароль',
                            button: 'Сохранить',
                            validationError: 'Некорректный пароль',
                            passwordDontMatch: 'Пароли не совпадают',
                            invalidCredentials: 'Пароль введен неверно, повторите попытку еще раз.',
                            serverDoesntRespond: 'Сервер не отвечает. Попытайтесь еще раз позже',
                        },
                        customerNavigation: {
                            editPersonalData: 'Редактировать личные данные',
                            editBankData: 'Редактировать банковские данные',
                            aboutService: 'О сервисе',
                            signOut: 'Выйти',
                        },
                        confirmationPopup: {
                            cancel: 'Отмена',
                            areYouSureYouWantToCancelTheOrder: 'Вы уверены, что хотите отменить заказ?',
                            yes: 'Да',
                        },

                        orderTimeCounter: {
                            min: 'мин.',
                            yourOrderIsAlreadyBeingPrepared: 'Ваш заказ уже готовят',
                            yourOrderWillBeReadySoon: 'Ваш заказ скоро будет готов',
                            yourOrderIsReady: 'Ваш заказ уже готов',
                            statusUnknown: 'Статус неизвестен',
                        },

                        waitingOrder: {
                            orderCode: 'Код заказа',
                            youCanCancelTheOrderWithin: 'Вы можете отменить заказ в течение ',
                            minutes: 'минут',
                            cancelOrder: 'Отменить заказ',
                            pleaseWaitForTheOrderConfirmation: 'Ожидайте подтверждения заказа',
                            preparationWillBeginUponConfirmation: 'Приготовление начнётся с момента подтверждения',
                            pleaseWaitForTheOrderCode: 'Ожидайте код заказа',
                            theWaitingTimeHasExpiredPleaseTryAgain: 'Время ожидания истекло. Попробуйте ещё раз',
                            anErrorOccurredWhileConfirmingTheOrderPleaseTryAgain: 'Произошла ошибка. Попробуйте ещё раз',
                            errorReceivingOrderData: 'Ошибка при получении данных о заказе',
                            errorWhileCancellingTheOrder: 'Ошибка при отмене заказа',
                            orderDoesNotExist: 'Заказ не существует',
                        },
                        button: {
                            next: 'Далее',
                        },

                        minutesForm: {
                            minutes_one: 'минута',
                            minutes_few: 'минуты',
                            minutes_many: 'минут',
                        },
                    },
                    pages: {
                        signIn: {
                            signInHeading: 'Вход',
                            invalidCredentials: 'Телефон или пароль введен неверно, повторите попытку еще раз.',
                            password: 'Пароль',
                            name: 'Имя Фамилия',
                            namePlaceholder: 'Владислав Иванов',
                            forgotPassword: 'Забыли пароль?',
                            loginButton: 'Войти',
                            registartion: 'Регистрация',
                        },
                        signUp: {
                            signUpHeading: 'Регистрация',
                            password: 'Пароль',
                            name: 'Имя Фамилия',
                            namePlaceholder: 'Владислав Иванов',
                            registerButton: 'Регистрация',
                            connectionError: 'Сервер не отвечает. Попробуйте позже',
                            PhoneNumberIsAlreadyUsed: 'Такой номер телефона уже зарегистрирован',
                            unknownError: 'Неизвестная ошибка',
                        },
                        confirmation: {
                            phoneConfirmation: 'Подтверждение номера',
                            enterSmsCode: 'Ввведите код из смс',
                            validationError: 'Неверный код',
                            serverError: 'Ошибка сервера',
                            invalidConformationCode: 'Введен неправильный код',
                        },
                        logout: {
                            areYouSure: 'Вы уверены, что хотите выйти?',
                            signout: 'Выйти',
                            serverError: 'Ошибка на сервере',
                            Unauthorized: 'Вы не авторизованы',
                        },
                        leaveOrderFeedback: {
                            evaluate: 'Оценить',
                            leaveFeedback: 'Оставить отзыв',
                            errorWhileSubmittingFeedback: 'Произошла ошибка при отправке отзыва.',
                            send: 'Отправить',
                            skip: 'Пропустить',
                            writeYourReview: 'Напишите свой отзыв',
                            starGrey: 'Звезда серая',
                            starRed: 'Звезда красная',
                            starOrange: 'Звезда оранжевая',
                        },
                        pageNotFound: {
                            goBack: 'Вернуться на главную',
                            somethingWentWrong: 'Кажется что-то пошло не так...',
                        },
                        passwordSaved: {
                            title: 'Ваш пароль сохранен!',
                        },

                        popupFeedbackThanks: {
                            title: 'Спасибо за отзыв!',
                        },

                        popupSignupSuccess: {
                            title: 'Спасибо за регистрацию!',
                        },

                        popupOrderCancelled: {
                            yourOrderHasBeeCancelled: 'Ваш заказ отменен',
                            youWillReceiveYourMoneyBackWithin15Minutes: 'В течение 15 минут вам вернут деньги',
                        },

                        profile: {
                            title: 'Профиль',
                            placeholderUserName: 'Владислав Иванов',
                            placeholderPhone: '+7 (***)',
                            nameLabelUserName: 'Имя Фамилия',
                            nameLabelPhone: 'Телефон',
                            nameLabelPassword: 'Новый пароль',
                            nameLabelRepeatPassword: 'Повторите пароль',
                            save: 'Сохранить',
                            passwordDontMatch: 'Пароли не совпадают',
                            errorMessage: 'Не удалось изменить данные',
                        },
                        error: {
                            server: 'Сервер не отвечает. Попробуйте позже',
                            validation: 'Данные заполненые неверно.',
                            duplicate: 'Такой номер телефона уже зарегистрирован',
                            validationError: 'Некорректный ввод',
                            invalidConformationCode: 'Введен неправильный код',
                            serverDoesntRespond: 'Сервер не отвечает. Попытайтесь еще раз позже',
                        },
                        restaurants: {
                            selectPlace: 'Выберите заведение',
                            filters: 'Фильтры',
                        },
                        filter: {
                            filters: 'Фильтры',
                            enterSearchString: 'Введите в поиске название блюда, продукта или заведение',
                            placeholder: 'Заведение, продукты, блюда',
                            chooseTypeOfVenue: 'Выберите тип заведения',
                            fastFood: 'Фаст фуд',
                            cafe: 'Кафе',
                            cafeBar: 'Кофейня',
                            nothingFound: 'Ничего не найдено',
                        },
                        restaurant: {
                            food: 'Еда',
                            drink: 'Напитки',
                            dessert: 'Десерты',
                        },
                        meal: {
                            fee: 'Комиссия:',
                            total: 'Итого:',
                            add: 'Добавить',
                        },
                        basket: {
                            basket: 'Корзина',
                            waitingTime: 'Время ожидания',
                            min: 'мин',
                            total: 'Итого:',
                            pay: 'Оплатить',
                            basketEmpty: 'Корзина пуста',
                            emptyBasket: 'Очистить корзину?',
                            yes: 'Да',
                            serverError: 'Ошибка на сервере',
                        },
                        feedback: {
                            feedback: 'Обратная связь',
                            describeYourProblemOrLeaveFeedback: 'Опишите свою проблему или оставьте пожелания',
                            submit: 'Отправить',
                            aboutUs: 'О нас',
                            preview: 'Превью',
                            offerAgreement: 'Договор оферты',
                            privacyPolicy: 'Политика конфиденциальности',
                        },
                        favorites: {
                            title: 'Избранное',
                            error_load: 'Ошибка загрузки',
                            list_empty: 'Ваш список избранного пуст...',
                        },
                    },

                    errors: {
                        anUnexpectedErrorHasOccurred: 'Произошла непредвиденная ошибка',
                    },
                },
            },
            kk: {
                translation: {
                    guestNavigation: {
                        signUpAsACatering: 'Қоғамдық тамақтану орны ретінде тіркеліңіз',
                        signUpAsABuyer: 'Сатып алушы ретінде тіркелу',
                        signIn: 'Кіру',
                    },
                },
            },
        },
    });

export default i18n;
