import {DateTime} from "luxon";

export function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function numberFormat(number: number, currency: string) {
    let numberFormat = new Intl.NumberFormat('sl-SI', {
        style: 'currency',
        currency: currency
    });

    return numberFormat.format(number);
}

export const formatText = (string: string) => (capitalize(string.replace('_', ' ')));

export const parseEmploymentType = (employmentType: string) => {
    switch (employmentType) {
        case 'contract':
            return 'By contract';
        case 'student':
            return 'Student work';
        case 'full_time_fixed_term':
            return 'Permanent employment, fixed term'
        case 'full_time':
            return 'Permanent employment'
        case 'project':
            return 'Project work';
        case 'retiree_work':
            return 'Work for retirees';
        default:
            return formatText(employmentType);
    }
}

export const parseEducation = (education: string) => {
    switch (education) {
        default:
            return 'None';
        case 'primary':
            return 'Primary school or equivalent';
        case 'bachelor':
            return 'Bachelor\'s degree or equivalent';
        case 'doctorate':
            return 'Doctorate';
        case 'master':
            return 'Master\'s degree or equivalent';
        case 'high_school':
            return 'High school or equivalent';
    }
}

export const formatDate = (string: string|undefined) => {
    if(string) {
        return DateTime.fromSQL(string).toFormat("dd.MM.yyyy");
    } else {
        return string;
    }
}

export const getClientLang = (lang: string) => {
    const baseLang = lang.substring(0, 2);

    const supportedLanguages = [
        "en",
        "sl"
    ];

    // @ts-ignore
    if (supportedLanguages.includes(baseLang)) {
        return baseLang;
    } else {
        return 'en';
    }
}


export function makeId(length: number = 8) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export const validatePasswords = (
    password: string | undefined,
    confirmPassword: string | undefined,
    t: (key: string) => string
): string[] => {
    const errors: string[] = [];

    if (password !== confirmPassword) {
        errors.push(t("The passwords must match!"));
    }
    if (!password || password.length < 8) {
        errors.push(t("The password must have a minimum of 8 characters!"));
    }
    if (!/[.,:/|?!*;@#$%^&\-_=+]/.test(password || "")) {
        errors.push(t("The password must include a symbol!"));
    }

    return errors;
};
