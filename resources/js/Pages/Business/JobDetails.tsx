import {useLaravelReactI18n} from "laravel-react-i18n";
import {CompanyData} from "../../Interfaces/GlobalTypes";
import {Head, usePage} from "@inertiajs/react";
import BusinessLayout from "../../Layouts/BusinessLayout";
import PageSection from "../Parts/PageSection";
import CompanyQuickView from "../Parts/CompanyQuickView";
import OverviewCard from "../Parts/OverviewCard";
import {FormWrapper} from "../Parts/FormParts/FormWrapper";
import FancyTitle from "../../Components/FancyTitle";

export default function NewJob({ job }) {
    const {t} = useLaravelReactI18n();
    let company: CompanyData = usePage().props.auth.company;

    return (
        <BusinessLayout>
            <Head title={t("[Business] Dashboard")} />

            <PageSection className={'bg-white full-h'}>
                <CompanyQuickView company={company}/>

                <FancyTitle heading={"This is job with id: " + job.id} />
            </PageSection>

        </BusinessLayout>
    );
}
