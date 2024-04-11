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
                        },
                        header: {
                            burgerTitleHover: 'Меню',
                            placeName: 'Алматы',
                            favouritesTitleHover: 'Избранное',
                            basketTitleHover: 'Корзина',
                            logoTitleHover: 'Bronfood',
                            buttonCloseTitleHover: 'Закрыть',
                        },
                        inputPhone: {
                            required: 'Обязательное поле',
                            invalidPhoneNumberFormat: 'Неверный ввод',
                            phoneNumber: 'Телефон',
                        },
                        inputPassword: {
                            required: 'Обязательное поле',
                            errorMessage: 'Неверный ввод',
                        },
                        input: {
                            required: 'Обязательное поле',
                            errorMessage: 'Неверный ввод',
                        },

                        customerNavigation: {
                            editPersonalData: 'Редактировать личные данные',
                            editBankData: 'Редактировать банковские данные',
                            signOut: 'Выйти',
                        },
                        confirmationPopup: {
                            cancel: 'Отмена',
                            areYouSureYouWantToCancelTheOrder: 'Вы уверены, что хотите отменить заказ?',
                            yes: 'Да',
                        },

                        orderTimeCounter: {
                            minutes: 'мин.',
                            yourOrderIsAlreadyBeingPrepared: 'Ваш заказ уже готовят',
                            yourOrderWillBeReadySoon: 'Ваш заказ скоро будет готов',
                            yourOrderIsReady: 'Ваш заказ уже готов',
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
                            phoneNumberIsAlreadyUsed: 'Номер телефона уже используется.',
                            password: 'Пароль',
                            name: 'Имя Фамилия',
                            namePlaceholder: 'Владислав Иванов',
                            registerButton: 'Регистрация',
                        },
                        logout: {
                            areYouSure: 'Вы уверены, что хотите выйти?',
                            signout: 'Выйти',
                            serverError: 'Ошибка на сервере',
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

                        newPassword: {
                            title: 'Придумайте новый пароль',
                            nameLabel: 'Новый пароль',
                            nameLabelRepeat: 'Повторите пароль',
                            button: 'Сохранить',
                            passwordDontMatch: 'Пароли не совпадают',
                            invalidCredentials: 'Пароль введен неверно, повторите попытку еще раз.',
                        },

                        passwordRecovery: {
                            title: 'Восстановить пароль',
                            phoneNumber: 'Телефон',
                            placeholder: '+7 (***)',
                            continue: 'Далее',
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
                        },
                        restaurants: {
                            selectPlace: 'Выберите заведение',
                        },
                        filter: {
                            filters: 'Фильтры',
                            enterSearchString: 'Введите в поиске название блюда, продукта или заведение',
                            placeholder: 'Заведение, продукты, блюда',
                            chooseTypeOfVenue: 'Выберите тип заведения',
                            fastFood: 'Фаст фуд',
                            cafe: 'Кафе',
                            cafeBar: 'Кофейня',
                        },
                        restaurant: {
                            food: 'Еда',
                            drink: 'Напитки',
                            dessert: 'Десерты',
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
