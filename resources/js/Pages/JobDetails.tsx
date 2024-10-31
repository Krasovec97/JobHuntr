import React from "react";
import {CompanyData, JobInterface} from "@/Interfaces/SharedInterfaces";
import MainLayout from "../Layouts/MainLayout";
import {Head} from "@inertiajs/react";
import PageSection from "../Components/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {formatText, numberFormat} from "@/Helpers";
import IconWithText from "../Components/IconWithText";
import {formatJobLocation} from "@/Helpers/Helpers";

interface PageProps extends JobInterface {
    job: JobInterface & {
        company: CompanyData
    }
}

export default function JobDetails({job}: PageProps) {
    const {t} = useLaravelReactI18n();

    return (
        <MainLayout>
            <Head title="Job Details"/>

            <PageSection className="bg-white" fullWidth={true}>
                <div className="col-12 col-md-6 mx-auto shadow border-3 pt-4 m-5 rounded  p-2">
                    <div className="row text-center">
                        <h1 className="h2 fw-bold">{job.title}</h1>
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
                                text={formatJobLocation(job)}/>

                            <IconWithText
                                icon={<i className="fa-solid fa-hand-holding-dollar my-auto"
                                         title={t('Starting salary')}></i>}
                                text={numberFormat(job.salary_from, job.salary_currency)}/>
                        </div>
                        <div className="col-10 mx-auto my-4">
                            <div className="border-bottom mb-3 pb-2">
                                <p className="fw-bold m-0">{t("Short company introduction")}</p>
                                <div className="col-12"
                                     dangerouslySetInnerHTML={{__html: job.intro}}>
                                </div>
                            </div>
                            <div className="border-bottom mb-3 pb-2">
                                <p className="fw-bold m-0">{t("Main Tasks")}</p>
                                <div className="col-12"
                                     dangerouslySetInnerHTML={{__html: job.assignments}}>
                                </div>
                            </div>

                            <div className="border-bottom mb-3 py-2">
                                <p className="fw-bold m-0">{t("What We Offer")}</p>
                                <div className="col-12"
                                     dangerouslySetInnerHTML={{__html: job.benefits}}>
                                </div>
                            </div>

                            <div className="border-bottom mb-3 py-2">
                                <p className="fw-bold m-0">{t("What We Expect")}</p>
                                <div className="col-12"
                                     dangerouslySetInnerHTML={{__html: job.expectations}}>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-12 col-md-6 border-bottom mb-3">
                                    <p className="fw-bold m-0">{t("Work field")}</p>
                                    {t(job.work_field?.name!)}
                                </div>
                                <div className="col-12 col-md-6 border-bottom mb-3">
                                    <p className="fw-bold m-0">{t("Employment type")}</p>
                                    {t(formatText(job.employment_type))}
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-12 col-md-6 border-bottom mb-3">
                                    <p className="fw-bold m-0">{t("Preferred education")}</p>
                                    {t(formatText(job.preferred_education))}
                                </div>
                                <div className="col-12 col-md-6 border-bottom mb-3">
                                    <p className="fw-bold m-0">{t("Number of open positions")}</p>
                                    {job.open_positions_count}
                                </div>
                            </div>
                            <div className="border-bottom mb-3">
                                <p className="fw-bold m-0">{t("Job application email")}</p>
                                <a href={"mailto:" + job.application_mail}>{job.application_mail}</a>
                            </div>
                            <div className="text-end my-5">
                                <button className="btn btn-primary me-3">{t("Apply now")}</button>
                                <a href="/jobs" className="btn btn-outline-secondary">{t('Back to all jobs')}</a>
                            </div>
                        </div>
                    </div>
                </div>

            </PageSection>
        </MainLayout>
    );
}
