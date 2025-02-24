import {Head} from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageSection from "@/Components/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "@/Components/FancyTitle";
import IconCard from "@/Components/IconCard";
import {CompanyData, JobInterface} from "@/Interfaces/SharedInterfaces";
import JobCard from "@/Components/JobCard";
import React, {useState} from "react";
import axios from "axios";
import JobPostModal from "@/Components/JobPostModal";
import ApplyModal from "@/Components/ApplyModal";

interface PageProps {
    newestJobs: Array<JobInterface>,
    draftedJobs: Array<JobInterface>,
}

type JobWithCompanyData = JobInterface & {
    company_data: CompanyData
};

export default function Welcome({newestJobs, draftedJobs}: PageProps) {
    const {t} = useLaravelReactI18n();
    const [clickedJob, setClickedJob] = useState<JobWithCompanyData|null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);


    const handleClose = () => {
        setClickedJob(null);
        setShowDetailsModal(false);
    };

    const handleShow = (index: number) => {
        axios.get('/api/job/' + index)
            .then((response) => {
                setClickedJob(response.data);
            })

        setShowDetailsModal(true);
    };

    const handleShowApplyModal = () => {
        setShowApplyModal(true);
        setShowDetailsModal(false);
    }

    const handleCloseApplyModal = () => {
        setShowApplyModal(false);
        setShowDetailsModal(true);
    }

    return (
        <MainLayout>
            <Head title={"Dobrodošli"}>
                <meta name="title" content="Prosta delovna mesta - JobHuntr"/>
                <meta name="description"
                      content="Naša platforma je zasnovana tako, da vas poveže s popolnimi priložnostmi, prilagojenimi vašim veščinam in željam. Pridružite se nam še danes in naredite prvi korak k svoji idealni karieri!"/>
                <meta property="og:title" content="Prosta delovna mesta - JobHuntr"/>
                <meta property="og:description"
                      content="Naša platforma je zasnovana tako, da vas poveže s popolnimi priložnostmi, prilagojenimi vašim veščinam in željam. Pridružite se nam še danes in naredite prvi korak k svoji idealni karieri!"/>
                <meta property="og:url" content={window.location.href}/>
                <meta property="og:image" content="https://jobhuntr.co/img/og_image.png"/>
                <meta property="og:type" content="website"/>
                <meta name="keywords"
                      content="delo, delovna mesta, iskanje zaposlitve, zaposlitev, prosta delovna mesta, jobhuntr, portal za zaposlovanje"/>
                <meta name="googlebot-news"
                      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>
            </Head>

            <PageSection className="bg-dark">
                <div className="row text-white text-center flex-column justify-content-center">
                    <div className="col-12 py-5">
                        <div className="col-12">
                            <img src="/img/job_seeker.webp" alt="noimg" height={250}/>
                        </div>

                        <h1 className="fw-bold">
                            {t("Searching for your dream job?")}
                        </h1>
                        <p className="w-md-50 mx-auto">
                            {t("Let JobHuntr Guide You! Our platform is designed to connect you with the perfect opportunities tailored to your skills and aspirations. Join us today and take the first step towards your ideal career!")}
                        </p>
                    </div>

                    <div className="col-12 mb-5">
                        <a className='btn btn-primary btn-lg me-4 px-5 fw-bold' href="/jobs">{t("Start searching").toUpperCase()}</a>
                    </div>
                </div>
            </PageSection>

            <PageSection className={"bg-white"}>
                <FancyTitle heading={t("Recently added jobs").toUpperCase()} subtitle={t("Fresh out of the oven")}/>

                <div className="row mb-5">
                    {newestJobs.length > 0 && newestJobs.map((job, index) => {
                        return (
                            <div onClick={() => handleShow(job.id)} key={index} className="col-12 col-md-6 col-xl-3 my-3">
                                <JobCard job={job} />
                            </div>
                        )
                    })}
                </div>
            </PageSection>

            <PageSection className={"bg-dark"}>
                <FancyTitle darkBg={true} heading={t("Why choose JobHuntr?").toUpperCase()} subtitle={t("Let us help you")}/>

                <div className="row">
                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={true} darkBg={true} icon={<i className="fa-solid fa-clipboard-list fa-4x"></i>}
                                  heading={t("Comprehensive Job Listings")}>
                            <p>{t("Access a wide range of job opportunities across various industries and locations. JobHuntr ensures you have the latest and most relevant job postings.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={true} darkBg={true} icon={<i className="fa-solid fa-user-group fa-4x"></i>}
                                  heading={t("User-Friendly Experience")}>
                            <p>{t("Enjoy an intuitive interface with advanced search filters and personalized job recommendations. Apply quickly and efficiently with our streamlined application process.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={true} darkBg={true} icon={<i className="fa-solid fa-handshake-angle fa-4x"></i>}
                                  heading={t("Support and Resources")}>
                            <p>{t("Benefit from resume building tools (coming soon), interview tips, and career advice. Our dedicated support team is always available to assist you throughout your job search.")}</p>
                        </IconCard>
                    </div>
                </div>
            </PageSection>

            <PageSection className={"bg-white"}>
                <FancyTitle heading={t("In the workshop").toUpperCase()} subtitle={t("These jobs might be coming soon")}/>

                <div className="row">
                    {draftedJobs.length !== 0 ? draftedJobs.map((job, index) => {
                            return (
                                <div key={index} className="col-12 col-md-6 col-xl-3 my-3">
                                    <JobCard job={job} isDrafted={true} />
                                </div>
                            )
                        })
                    :
                        <div className="col-12 my-auto text-center">
                            <div className="col-12 col-md-4 mx-auto border rounded shadow p-4 my-4">
                                <i className="fa-solid fa-circle-check fa-2x text-primary mb-3"></i>
                                <h1 className="fw-bold">{t("Hurray!")}</h1>
                                <p>{t("All jobs on JobHuntr are already posted!")}</p>
                                <button className="btn btn-primary fw-bold mt-4">{t("See available jobs")}</button>
                            </div>
                        </div>
                    }
                </div>
            </PageSection>

            {clickedJob && <JobPostModal showModal={showDetailsModal} clickedJob={clickedJob} handleClose={handleClose} handleShowApplyModal={handleShowApplyModal} />}
            {clickedJob && <ApplyModal showModal={showApplyModal} handleClose={() => handleCloseApplyModal()} job={clickedJob}/>}
        </MainLayout>
    );
}

