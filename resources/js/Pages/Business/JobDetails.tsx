import {useLaravelReactI18n} from "laravel-react-i18n";
import {Head, useForm, usePage} from "@inertiajs/react";
import BusinessLayout from "@/Layouts/BusinessLayout";
import PageSection from "@/Components/PageSection";
import CompanyQuickView from "../Parts/CompanyQuickView";
import {CompanyData, CompanyAuthProps, JobInterface} from "@/Interfaces/SharedInterfaces";
import {formatDate, formatText, numberFormat} from "@/Helpers";
import React, {useState} from "react";

interface JobDetailsProps {
    job: JobInterface
}

export default function NewJob({ job }: JobDetailsProps) {
    const {t} = useLaravelReactI18n();
    let company: CompanyData = usePage<CompanyAuthProps>().props.auth.company;
    const companyVerified = company.company_verified_at !== null;
    const {post} = useForm();
    const [descriptionContent, setDescriptionContent] = useState<string>(job.intro);
    const [currentActiveTab, setCurrentActiveTab] = useState<string>('intro');

    let editJobButton = () => (window.location.href = `/job/${job.id}/update`)
    let publishJobListingButton = () => {
        post(`/job/${job.id}/activate`)
        window.location.reload();
    }
    let cancelJobListing = () => (post(`/job/${job.id}/cancel`))

    return (
        <BusinessLayout>
            <Head title={t("[Business] Dashboard")} />

            <PageSection className={'bg-white full-h'}>
                <CompanyQuickView company={company}/>
                <div className="row my-4 pb-2 text-grey text-center text-md-start border-2 border-bottom border-primary border-opacity-10">
                    <div className="col-12 col-md-6">
                        <h3 className={"text-dark"}>{job.title}</h3>
                    </div>
                    {job.status === 'draft' &&
                        <div className="col-12 col-md-6 text-end">
                            <button onClick={publishJobListingButton} disabled={!companyVerified} className="btn btn-primary">
                                {t("Activate job listing")}
                            </button>
                            <button onClick={editJobButton} className="btn btn-outline-primary ms-4">
                                {t("Edit this job")}
                            </button>
                        </div>
                    }
                    {job.status === 'active' &&
                        <div className="col-12 col-md-6 text-end">
                            <button onClick={cancelJobListing} className="btn btn-outline-primary">
                                {t("Cancel job listing")}
                            </button>
                        </div>
                    }
                    {!companyVerified &&
                        <small>{t('Only verified companies can post jobs on JobHuntr. Please wait until we verify you.')}</small>
                    }
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="row">
                            <div className="col-4 fw-semibold">{t("Employment type")}:</div>
                            <div className="col-8">{t(formatText(job.employment_type))}</div>
                        </div>

                        <div className="row">
                            {job.method_of_payment === 'salary' ?
                                <>
                                    <div className="col-4 fw-semibold">{job.salary_to ? t("Salary range") : t('Salary')}:</div>
                                    <div className="col-8">
                                        {numberFormat(job.salary_from, job.salary_currency) + (!job.salary_to ? '+ ' : ' - ') + (job.salary_to ? numberFormat(job.salary_to, job.salary_currency) : '')}
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-4 fw-semibold">{t("Hourly rate")}:</div>
                                    <div className="col-8">{numberFormat(job.hourly_rate, job.salary_currency)}</div>
                                </>
                            }

                        </div>

                        <div className="row">
                            <div className="col-4 fw-semibold">{t("Work field")}:</div>
                            <div className="col-8">{job.work_field?.name}</div>
                        </div>

                        <div className="row">
                            <div className="col-4 fw-semibold">{t("Work location")}:</div>
                            <div className="col-8">{t(formatText(job.work_location))}</div>
                        </div>

                        {job.education &&
                            <div className="row">
                                <div className="col-4 fw-semibold">{t("Preferred education")}:</div>
                                <div className="col-8">{job.education}</div>
                            </div>
                        }
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="row">
                            <div className="col-5 fw-semibold">{t("Number of open positions")}:</div>
                            <div className="col-7">{job.open_positions_count}</div>
                        </div>

                        {job.posted_at !== null && <div className="row">
                            <div className="col-5 fw-semibold">{t("Job posted at")}:</div>
                            <div className="col-7">{formatDate(job.posted_at)}</div>
                        </div>}

                        {job.expires_at !== null && <div className="row">
                            <div className="col-5 fw-semibold">{t("Job post expires at")}:</div>
                            <div className="col-7">{formatDate(job.expires_at)}</div>

                        </div>}
                    </div>

                    <div className="col-12 mt-4">
                        <div className="row">
                            <h3 className="col-12 fw-semibold my-3">{t("Job description")}</h3>
                            <div className="col-3">
                                <button className={`btn col-12 p-3 ${currentActiveTab === 'intro' ? 'bg-primary text-white fw-bold' : 'bg-light'}`}
                                        onClick={() => {
                                            setDescriptionContent(job.intro);
                                            setCurrentActiveTab('intro');
                                        }}
                                >
                                    <p className='m-0'>{t('Short company introduction')}</p>
                                </button>
                                <button className={`btn col-12 p-3 ${currentActiveTab === 'assignments' ? 'bg-primary text-white fw-bold' : 'bg-light'}`}
                                        onClick={() => {
                                            setDescriptionContent(job.assignments)
                                            setCurrentActiveTab('assignments');
                                        }}
                                >
                                    <p className='m-0'>{t('Main Tasks')}</p>
                                </button>
                                <button className={`btn col-12 p-3 ${currentActiveTab === 'benefits' ? 'bg-primary text-white fw-bold' : 'bg-light'}`}
                                        onClick={() => {
                                            setDescriptionContent(job.benefits)
                                            setCurrentActiveTab('benefits');
                                        }}
                                >
                                    <p className='m-0'>{t('What We Offer')}</p>
                                </button>
                                <button className={`btn col-12 p-3 ${currentActiveTab === 'expectations' ? 'bg-primary text-white fw-bold' : 'bg-light'}`}
                                        onClick={() => {
                                            setDescriptionContent(job.expectations)
                                            setCurrentActiveTab('expectations');
                                        }}
                                >
                                    <p className='m-0'>{t('What We Expect')}</p>
                                </button>
                            </div>
                            <div className="col-9 card p-3">
                                <div dangerouslySetInnerHTML={{__html: descriptionContent}}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </PageSection>

        </BusinessLayout>
    );
}
