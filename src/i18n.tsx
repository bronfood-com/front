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
                            signUpAsACatering: 'Зарегистрироваться как заведение общественного питания',
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
                        profile: {
                            profileHeading: 'Профиль',
                            name: 'Имя Фамилия',
                            namePlaceholder: 'Владислав Иванов',
                            phoneNumber: 'Телефон',
                            password: 'Пароль',
                            passwordRepeat: 'Повторите пароль',
                        }
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
