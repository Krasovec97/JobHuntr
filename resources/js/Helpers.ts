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

export let formatText = (string: string) => (capitalize(string.replace('_', ' ')));

export let formatDate = (string: string) => DateTime.fromSQL(string).toFormat("dd.MM.yyyy");

