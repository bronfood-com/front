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
                    auth: {
                        heading: 'Вход',
                        errorMessage:'Телефон или пароль введен неверно, повторите попытку еще раз.',
                        phoneInput:'Телефон',
                        passwordInput:'Пароль',
                        forgotPass:'Забыли пароль?',
                        loginButton:'Войти',
                        regLink:'Регистрация',
                    },
                    input:{
                        required:'Обязательное поле',
                        errorMessage:'Неверный ввод'
                    }
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
