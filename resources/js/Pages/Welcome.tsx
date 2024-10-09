import {Head} from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageSection from "@/Components/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "@/Components/FancyTitle";
import IconCard from "@/Components/IconCard";
import {CompanyData, JobInterface} from "@/Interfaces/SharedInterfaces";
import JobCard from "@/Components/JobCard";
import {formatText, numberFormat} from "@/Helpers";
import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import axios from "axios";

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
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setClickedJob(null);
        setShowModal(false);
    };

    const handleShow = (index: number) => {
        axios.get('/api/job/' + index)
            .then((response) => {
                setClickedJob(response.data);
            })

        setShowModal(true);
    };

    return (
        <MainLayout>
            <Head title="Welcome"/>

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

            {clickedJob &&
                <Modal show={showModal} size={'lg'} fullscreen={"sm-down"} centered onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="fw-bold">{clickedJob.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="border-bottom mb-3">
                            <p className="fw-bold m-0">{t("Employment type")}</p>
                            {formatText(clickedJob.employment_type)}
                        </div>
                        <div className="border-bottom mb-3">
                            <p className="fw-bold m-0">{t("Salary")}</p>
                            {numberFormat(clickedJob.salary_from, clickedJob.salary_currency)}
                        </div>
                        <div className="border-bottom mb-3">
                            <p className="fw-bold m-0">{t("Work field")}</p>
                            {clickedJob.work_field?.name}
                        </div>
                        <div className="border-bottom mb-3">
                            <p className="fw-bold m-0">{t("Work Location")}</p>
                            {formatText(clickedJob.work_location)}
                        </div>
                        <div className="border-bottom mb-3">
                            <p className="fw-bold m-0">{t("Description")}</p>
                            <div className="col-12"
                                 dangerouslySetInnerHTML={{__html: clickedJob.intro.substring(0, 300)}}>
                            </div>
                        </div>

                        <div className="border-bottom mb-3">
                            <p className="fw-bold m-0">{t("Job application email")}</p>
                            <a href={"mailto:" + clickedJob.application_mail}>{clickedJob.application_mail}</a>
                        </div>

                        <div className="my-3">
                            {clickedJob.company_data.id !== 1 ? <>
                                    <span className="fw-bold">{t("Employer info")}:</span>
                                    <div>
                                        {clickedJob.company_data.full_name}
                                    </div>
                                    <div>
                                        {clickedJob.company_data.street}, <br/>
                                        {clickedJob.company_data.zip + " " + clickedJob.company_data.city}
                                    </div>
                                    <div>
                                        {clickedJob.company_data.contact_phone}
                                    </div>
                                </>
                                :
                                <div className="text-end">
                                    <small
                                        className="my-auto fw-light fst-italic">{t("This job was posted by JobHuntr")}</small>
                                </div>
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" target='_blank' href={'/job/' + clickedJob.id}>
                            {t("See more details")}
                        </Button>
                        <Button variant="dark" onClick={handleClose}>
                            {t("Close")}
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </MainLayout>
    );
}

