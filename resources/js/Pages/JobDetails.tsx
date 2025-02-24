import React, {useState} from "react";
import {CompanyData, JobInterface} from "@/Interfaces/SharedInterfaces";
import MainLayout from "../Layouts/MainLayout";
import {Head} from "@inertiajs/react";
import PageSection from "../Components/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {parseEmploymentType} from "@/Helpers";
import IconWithText from "../Components/IconWithText";
import {formatJobLocation, parseMethodOfPayment} from "@/Helpers/Helpers";
import ApplyButton from "@/Components/ApplyButton";
import ApplyModal from "@/Components/ApplyModal";

interface PageProps extends JobInterface {
    job: JobInterface & {
        company: CompanyData
    }
}

export default function JobDetails({job}: PageProps) {
    const {t} = useLaravelReactI18n();
    const {title, description} = parseMethodOfPayment(job);
    const [showApplyModal, setShowApplyModal] = useState(false);

    return (
        <MainLayout>
            <Head title={job.title}>
                <meta name="title" content={job.title}/>
                <meta name="description" content={job.intro.replace(/(<([^>]+)>)/gi, "")}/>
                <meta property="og:title" content={job.title}/>
                <meta property="og:description" content={job.intro.replace(/(<([^>]+)>)/gi, "")}/>
                <meta property="og:url" content={window.location.href}/>
                <meta property="og:image:secure_url" content="https://jobhuntr.co/img/og_image.png"/>
                <meta property="og:type" content="website"/>
                <meta name="googlebot-news"
                      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
                <meta name="keywords"
                      content={`iskanje zaposlitve, zaposlitev, prosta delovna mesta, jobhuntr, ${job.title.toLowerCase()}`}/>
            </Head>

            <PageSection className="bg-white" fullWidth={true}>
                <div className="col-12 col-md-7 mx-auto shadow border-3 pt-4 m-5 rounded  p-2">
                    <div className="row text-center">
                        <h1 className="h2 fw-bold">{job.title}</h1>
                    </div>

                    <hr className="my-3"/>

                    <div className="col-12 mx-auto">
                        <div className="col-12 col-xl-10 mx-auto d-flex justify-content-between my-4">
                            {job.company.id !== 1 &&
                                <IconWithText
                                    icon={<i className="fa-solid fa-user-tie my-auto" title={t('Employer')}></i>}
                                    text={job.company.name}/>
                            }

                            <IconWithText
                                icon={<i className="fa-solid fa-earth-europe my-auto" title={t("Job location")}></i>}
                                text={formatJobLocation(job)}/>

                            <IconWithText
                                icon={<i className="fa-solid fa-hand-holding-dollar my-auto"
                                         title={title}></i>}
                                text={description}/>
                        </div>

                        <div className="col-12 col-xl-10 mx-auto my-4">
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
                                    {t(parseEmploymentType(job.employment_type))}
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-12 col-md-6 border-bottom mb-3">
                                    <p className="fw-bold m-0">{t("Preferred education")}</p>
                                    {job.education ?? t("Not important")}
                                </div>
                                <div className="col-12 col-md-6 border-bottom mb-3">
                                    <p className="fw-bold m-0">{t("Number of open positions")}</p>
                                    {job.open_positions_count}
                                </div>
                            </div>
                            <div className="text-end my-5">
                                <div className="mb-2">
                                    <ApplyButton handleApplyClick={() => setShowApplyModal(true)}/>
                                </div>
                                <div>
                                    <a href="/jobs" className="btn btn-outline-secondary">{t('Back to all jobs')}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ApplyModal showModal={showApplyModal} handleClose={() => setShowApplyModal(false)} job={job} />
            </PageSection>
        </MainLayout>
    );
}
