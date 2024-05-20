import {useLaravelReactI18n} from "laravel-react-i18n";
import {CompanyData} from "../../Interfaces/GlobalTypes";
import {Head, usePage} from "@inertiajs/react";
import BusinessLayout from "../../Layouts/BusinessLayout";
import PageSection from "../Parts/PageSection";
import CompanyQuickView from "../Parts/CompanyQuickView";
import FancyTitle from "../../Components/FancyTitle";
import {JobInterface} from "../../Interfaces/SharedInterfaces";
import {capitalize, numberFormat} from "../../Helpers";

interface JobDetailsProps {
    job: JobInterface
}

export default function NewJob({ job }: JobDetailsProps) {
    const {t} = useLaravelReactI18n();
    let company: CompanyData = usePage().props.auth.company;

    let formatText = (string) => (capitalize(string.replace('_', ' ')));

    let editJobButton = () => (window.location.href = `/job/${job.id}/update`)

    return (
        <BusinessLayout>
            <Head title={t("[Business] Dashboard")} />

            <PageSection className={'bg-white full-h'}>
                <CompanyQuickView company={company}/>
                <div className="row my-4 pb-2 text-grey border-2 border-bottom border-primary border-opacity-10">
                    <div className="col-6">
                        <h3 className={"text-dark"}>{job.title}</h3>
                    </div>
                    <div className="col-6 text-end">
                        <button className="btn btn-primary">
                            {t("Activate job listing")}
                        </button>
                        <button onClick={editJobButton} className="btn btn-outline-primary ms-4">
                            {t("Edit this job")}
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-4 fw-semibold">{t("Employment type")}:</div>
                            <div className="col-8">{formatText(job.employment_type)}</div>
                        </div>

                        <div className="row">
                            <div className="col-4 fw-semibold">{t("Salary")}:</div>
                            <div className="col-8">{numberFormat(job.salary, job.salary_currency)}</div>
                        </div>

                        <div className="row">
                            <div className="col-4 fw-semibold">{t("Work area")}:</div>
                            <div className="col-8">{job.work_area.name}</div>
                        </div>

                        <div className="row">
                            <div className="col-4 fw-semibold">{t("Work field")}:</div>
                            <div className="col-8">{job.work_field.name}</div>
                        </div>

                        <div className="row">
                            <div className="col-4 fw-semibold">{t("Work location")}:</div>
                            <div className="col-8">{capitalize(job.work_location)}</div>
                        </div>

                        <div className="row">
                            <div className="col-4 fw-semibold">{t("Preferred gender")}:</div>
                            <div className="col-8">{capitalize(job.preferred_gender)}</div>
                        </div>

                        <div className="row">
                            <div className="col-4 fw-semibold">{t("Preferred education")}:</div>
                            <div className="col-8">{capitalize(job.preferred_education)}</div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="row">
                            <div className="col-5 fw-semibold">{t("Number of open positions")}:</div>
                            <div className="col-7">{job.open_positions_count}</div>
                        </div>

                        {job.expires_at !== null && <div className="row">
                            <div className="col-5 fw-semibold">{t("Job posting expires at")}:</div>
                            <div className="col-7">{job.expires_at}</div>
                        </div>}

                        {job.posted_at !== null && <div className="row">
                            <div className="col-5 fw-semibold">{t("Job posting expires at")}:</div>
                            <div className="col-7">{job.posted_at}</div>
                        </div>}

                        <div className="row mt-1">
                            <div className="col-12 fw-semibold">{t("Job description")}:</div>
                            <div className="col-12">{job.description}</div>
                        </div>
                    </div>

                </div>
            </PageSection>

        </BusinessLayout>
    );
}
