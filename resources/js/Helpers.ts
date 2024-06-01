import {DateTime} from "luxon";

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function numberFormat(number: number, currency: string) {
    let numberFormat = new Intl.NumberFormat('sl-SI', {
        style: 'currency',
        currency: currency
    });

    return numberFormat.format(number);
}

export let formatText = (string) => (capitalize(string.replace('_', ' ')));

export let formatDate = (string) => DateTime.fromSQL(string).toFormat("dd.MM.yyyy");

export function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

