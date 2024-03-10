import {useLaravelReactI18n} from "laravel-react-i18n";
import MainLayout from "../../Layouts/MainLayout";
import {Head, usePage} from "@inertiajs/react";
import PageSection from "../Parts/PageSection";
import BusinessLayout from "../../Layouts/BusinessLayout";
import {CompanyData} from "../../Interfaces/GlobalTypes";
import OverviewCard from "../Parts/OverviewCard";
import CompanyQuickView from "../Parts/CompanyQuickView";


export default function Dashboard() {
    const {t} = useLaravelReactI18n();
    let company: CompanyData = usePage().props.auth.company;

    return (
        <BusinessLayout>
            <Head title={t("[Business] Dashboard")} />

            <PageSection className={'bg-white full-h'}>
                <CompanyQuickView company={company} tokensRemaining={1775}/>
                <div className={"row mt-4"}>
                    <h3 className={"fw-bold"}>
                        {t("A quick overview").toUpperCase()}:
                    </h3>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <OverviewCard headerText={"Jobs"} count={20} desc={"Posted in the last 30 days"}/>
                    </div>

                    <div className="col-12 col-md-6">
                        <OverviewCard headerText={"Applicants"} count={117} desc={"Applied in the last 30 days"}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <OverviewCard headerText={"Tokens"} count={1.775} desc={"Remaining"}/>
                    </div>

                    <div className="col-12 col-md-6">
                        <OverviewCard headerText={"Views"} count={12.275} desc={"Of your jobs"}/>
                    </div>
                </div>
            </PageSection>

        </BusinessLayout>
    );
}
