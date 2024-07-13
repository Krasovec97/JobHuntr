import React from "react";
import {CompanyData, JobInterface} from "../Interfaces/SharedInterfaces";
import MainLayout from "../Layouts/MainLayout";
import {Head} from "@inertiajs/react";
import PageSection from "../Components/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {formatText, numberFormat} from "../Helpers";
import IconWithText from "../Components/IconWithText";

interface PageProps extends JobInterface {
    job: JobInterface & {
        company: CompanyData
    }
}

export default function JobDetails({job}: PageProps) {
    const {t} = useLaravelReactI18n();

    let formatJobLocation = () => {
        switch (job.work_location) {
            case "remote":
                return t('Remote');
            default:
                return `${job.street}, ${job.zip} ${job.city}, ${job.country}`
        }
    }

    return (
        <MainLayout>
            <Head title="Job Details"/>

            <PageSection className="bg-white" fullWidth={true}>
                <div className="col-12 col-md-6 mx-auto shadow border-3 m-5 rounded p-md-5 p-2">
                    <div className="row text-center">
                        <h1 className="fw-bold">{job.title}</h1>
                    </div>

                    <hr className="my-3"/>

                    <div className="col-12 mx-auto">
                        <div className="d-flex justify-content-evenly my-4">
                            {job.company.id !== 1 &&
                                <IconWithText
                                    icon={<i className="fa-solid fa-user-tie my-auto" title={t('Employer')}></i>}
                                    text={job.company.full_name}/>
                            }

                            <IconWithText
                                icon={<i className="fa-solid fa-earth-europe my-auto" title={t("Job location")}></i>}
                                text={formatJobLocation()}/>

                            <IconWithText
                                icon={<i className="fa-solid fa-hand-holding-dollar my-auto"
                                         title={t('Starting salary')}></i>}
                                text={numberFormat(job.salary, job.salary_currency)}/>
                        </div>
                        <div className="my-5 col-10 mx-auto" dangerouslySetInnerHTML={{__html: job.description}}></div>
                        <div className="col-10 mx-auto my-4">
                            <div className="border-bottom mb-3">
                                <p className="fw-bold m-0">{t("Work Area")}</p>
                                {job.work_area?.name}
                            </div>
                            <div className="border-bottom mb-3">
                                <p className="fw-bold m-0">{t("Work Field")}</p>
                                {job.work_field?.name}
                            </div>
                            <div className="border-bottom mb-3">
                                <p className="fw-bold m-0">{t("Employment Type")}</p>
                                {formatText(job.employment_type)}
                            </div>
                            <div className="border-bottom mb-3">
                                <p className="fw-bold m-0">{t("Preferred Education")}</p>
                                {formatText(job.preferred_education)}
                            </div>
                            <div className="border-bottom mb-3">
                                <p className="fw-bold m-0">{t("Number of open positions")}</p>
                                {job.open_positions_count}
                            </div>
                            <div className="border-bottom mb-3">
                                <p className="fw-bold m-0">{t("Job application email")}</p>
                                <a href={"mailto:" + job.application_mail}>{job.application_mail}</a>
                            </div>
                            <div className="text-end">
                                <a href="/jobs" className="btn btn-primary">{t('Back to all jobs')}</a>
                            </div>
                        </div>
                    </div>
                </div>

            </PageSection>
        </MainLayout>
    );
}
