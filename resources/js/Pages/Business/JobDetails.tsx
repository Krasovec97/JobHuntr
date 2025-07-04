import {useLaravelReactI18n} from "laravel-react-i18n";
import {Head, usePage} from "@inertiajs/react";
import BusinessLayout from "@/Layouts/BusinessLayout";
import PageSection from "@/Components/PageSection";
import CompanyQuickView from "../Parts/CompanyQuickView";
import {CompanyData, CompanyAuthProps, JobInterface} from "@/Interfaces/SharedInterfaces";
import {formatDate, formatText, numberFormat, parseEmploymentType} from "@/Helpers";
import React, {useState} from "react";
import ActivateJobListingModal from "@/Components/ActivateJobListingModal";
import axios from "axios";

interface JobDetailsProps {
    job: JobInterface
}

export default function NewJob({ job }: JobDetailsProps) {
    const {t} = useLaravelReactI18n();
    let company: CompanyData = usePage<CompanyAuthProps>().props.auth.company;
    const companyVerified = company.company_verified_at !== null;
    const [descriptionContent, setDescriptionContent] = useState<string>(job.intro);
    const [currentActiveTab, setCurrentActiveTab] = useState<string>('intro');
    const [showModal, setShowModal] = useState<boolean>(false);

    let editJobButton = () => (window.location.href = `/job/${job.id}/update`)
    let cancelJobListing = () => {
        axios.post(`/job/${job.id}/cancel`).then(() => {
            window.location.reload()
        })
    }

    const handleJobStatusChange = (status: string) => {
        if (status === 'active') {
            cancelJobListing();
        } else {
            setShowModal(true);
        }
    }


    return (
        <BusinessLayout>
            <Head title={t("[Business] Dashboard")} />

            <PageSection className={'bg-white full-h'}>
                <CompanyQuickView company={company}/>
                <div className="row my-4 pb-2 text-grey text-center text-md-start border-2 border-bottom border-primary border-opacity-10">
                    <div className="col-12 col-md-6">
                        <h3 className={"text-dark"}>{job.title}</h3>
                    </div>
                    <div className="col-12 col-md-6 text-end">
                        <button onClick={() => handleJobStatusChange(job.status)} disabled={!companyVerified} className="btn btn-primary">
                            {job.status === 'active' ? t("Cancel job listing") : t("Activate job listing")}
                        </button>

                        <button onClick={editJobButton} disabled={job.status === 'active'} className="btn btn-outline-primary ms-4">
                            {t("Edit this job")}
                        </button>
                        <div className="mt-2">
                            {job.status === 'active' &&
                                <small>
                                    {t("To edit this job post, please deactivate it first.")}
                                </small>
                            }
                        </div>
                    </div>
                    {!companyVerified &&
                        <small>{t('Only verified companies can post jobs on JobHuntr. Please wait until we verify you.')}</small>
                    }
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="row">
                            <div className="col-4 fw-semibold">{t("Employment type")}:</div>
                            <div className="col-8">{t(parseEmploymentType(job.employment_type))}</div>
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
                            <div className="col-8">{job.work_field?.name ? t(job.work_field?.name): ''}</div>
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

            <ActivateJobListingModal showModal={showModal} handleClose={() => setShowModal(false)} job={job} />
        </BusinessLayout>
    );
}
