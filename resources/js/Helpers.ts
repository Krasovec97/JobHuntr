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

export const formatDate = (string: string|undefined) => {
    if(typeof string !== "undefined") {
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

