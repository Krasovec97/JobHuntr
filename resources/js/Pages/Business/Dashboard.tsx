import {useLaravelReactI18n} from "laravel-react-i18n";
import MainLayout from "../../Layouts/MainLayout";
import {Head, usePage} from "@inertiajs/react";
import PageSection from "../Parts/PageSection";
import BusinessLayout from "../../Layouts/BusinessLayout";
import {CompanyData} from "../../Interfaces/GlobalTypes";


export default function Dashboard() {
    const {t} = useLaravelReactI18n();
    let company: CompanyData = usePage().props.auth.company;

    return (
        <BusinessLayout>
            <Head title="[Business] Dashboard" />

            <PageSection className={'bg-white full-h'}>
                <div>{company.full_name}</div>
            </PageSection>

        </BusinessLayout>
    );
}
