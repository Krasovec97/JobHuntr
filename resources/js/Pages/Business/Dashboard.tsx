import {useLaravelReactI18n} from "laravel-react-i18n";
import {Head, usePage} from "@inertiajs/react";
import PageSection from "../../Components/PageSection";
import BusinessLayout from "../../Layouts/BusinessLayout";
import CompanyQuickView from "../Parts/CompanyQuickView";
import {CompanyData, CompanyAuthProps} from "@/Interfaces/SharedInterfaces";
import React from "react";


export default function Dashboard() {
    const {t} = useLaravelReactI18n();
    let company: CompanyData = usePage<CompanyAuthProps>().props.auth.company;

    return (
        <BusinessLayout>
            <Head title={t("[Business] Dashboard")} />

            <PageSection className={'bg-white full-h'}>
                <CompanyQuickView company={company}/>
                <div className={"row mt-4 text-center"}>
                    <h3 className={"fw-bold"}>{t("Hello") + ", " + company.name}!</h3>
                    <div className="text-center mt-2">
                        <p>{t("Welcome to your dashboard. Soon, you will have access to features such as analytics, job posting overviews, and many additional capabilities. These enhancements are currently under development and will be available shortly.")}</p>
                        <p>{t("For now, you may navigate to your jobs screen, by clicking the JOBS button on your left side navigation menu.")}</p>
                    </div>
                </div>

                {/*<div className="row">*/}
                {/*    <div className="col-12 col-md-6">*/}
                {/*        <OverviewCard headerText={"Jobs"} count={20} desc={"Posted in the last 30 days"}/>*/}
                {/*    </div>*/}

                {/*    <div className="col-12 col-md-6">*/}
                {/*        <OverviewCard headerText={"Applicants"} count={117} desc={"Applied in the last 30 days"}/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="row">*/}
                {/*    <div className="col-12 col-md-6">*/}
                {/*        <OverviewCard headerText={"Tokens"} count={1.775} desc={"Remaining"}/>*/}
                {/*    </div>*/}

                {/*    <div className="col-12 col-md-6">*/}
                {/*        <OverviewCard headerText={"Views"} count={12.275} desc={"Of your jobs"}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </PageSection>

        </BusinessLayout>
    );
}
