import {JobInterface} from "@/Interfaces/SharedInterfaces";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {numberFormat} from "@/Helpers";


export let formatJobLocation = (job: JobInterface) => {
    const {t} = useLaravelReactI18n();

    switch (job.work_location) {
        case "remote":
            return t('Remote');
        default:
            return `${job.street}, ${job.zip} ${job.city}, ${job.country}`
    }
}

export function parseMethodOfPayment(job: JobInterface) {
    const {t} = useLaravelReactI18n();
    let title = '';
    let description = '';

    switch (job.method_of_payment) {
        case 'provision':
            title = t("Method of payment");
            description = t("Provision");
            break;
        case 'salary':
            title = t("Starting Salary");
            description = numberFormat(job.salary_from, job.salary_currency);
            break;
        case 'hourly':
            title = t("Hourly rate");
            description = numberFormat(job.hourly_rate, job.salary_currency)
            break;
        case 'by_agreement':
            title = t("Method of payment");
            description = t("By agreement");
            break;
    }
    return {title, description};
}
