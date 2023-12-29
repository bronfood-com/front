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
                            searchTitleHover: 'Поиск',
                            logoTitleHover: 'Bronfood',
                            buttonCloseTitleHover: 'Закрыть',
                        },
                        inputPhone: {
                            required: 'Обязательное поле',
                            invalidPhoneNumberFormat: 'Неверный ввод',
                            phoneNumber: 'Телефон',
                        },
                        input: {
                            required: 'Обязательное поле',
                            errorMessage:  'Неверный ввод',
                        },

                        customerNavigation: {
                            editPersonalData: 'Редактировать личные данные',
                            editBankData: 'Редактировать банковские данные',
                            signOut: 'Выйти',
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
                        passwordSaved: {
                            title: 'Ваш пароль сохранен!',
                        },

                        popupFeedbackThanks: {
                            title: 'Спасибо за отзыв!'
                        },

                        popupSignupSuccess: {
                            title: 'Спасибо за регистрацию!'
                        },

                        newPassword: {
                            title:'Придумайте новый пароль',
                            nameLabel: 'Новый пароль',
                            nameLabelRepeat: 'Повторите пароль',
                            button:'Сохранить'
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
                            continue: 'Далее',
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
