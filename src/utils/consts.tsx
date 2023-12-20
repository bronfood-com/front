/**
 * includes cyrillic alphabet, * includes latin alphabet, * includes kazakh alphabet,
 * includes dash, * only one space after words, * not space in the end
 */
export const regexClientName: RegExp = /^([a-zA-Z\\-]+(?:\s[a-zA-Z\\-]+)|[a-яА-ЯёЁ\\-]+(?:\s[a-яА-ЯёЁ\\-]+)*|[a-яА-ЯёЁ-ӘҒҚҢӨҰҮІі]+(?:\s[a-яА-ЯёЁ-ӘҒҚҢӨҰҮІі]+)*)$/;
export const regexPassword: RegExp = /^[A-Za-z\d!@#$%^&*()-_+=<>?]{4,20}$/;
export const regexPhoneNumberKazakhstan: RegExp = /^\+7 \(\d{3}\) \d{2}-\d{2}-\d{2}$/;
