import {JobInterface} from "@/Interfaces/SharedInterfaces";
import {useLaravelReactI18n} from "laravel-react-i18n";


export let formatJobLocation = (job: JobInterface) => {
    const {t} = useLaravelReactI18n();

    switch (job.work_location) {
        case "remote":
            return t('Remote');
        default:
            return `${job.street}, ${job.zip} ${job.city}, ${job.country}`
    }
}
