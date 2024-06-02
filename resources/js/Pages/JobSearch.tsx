import {Head} from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout.tsx';
import PageSection from "./Parts/PageSection.tsx";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "../Components/FancyTitle.tsx";
import JobCard from "../Components/JobCard";
import {toTitleCase} from "../Helpers";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {CompanyData, JobInterface} from "../Interfaces/SharedInterfaces";

type JobWithCompanyData = JobInterface & {
    company_data: CompanyData
};

export default function JobSearch() {
    const {t} = useLaravelReactI18n();
    const [showModal, setShowModal] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [clickedJob, setClickedJob] = useState<JobWithCompanyData|null>(null);

    useEffect(() => {
        axios.get('/api/jobs')
            .then((response) => {
                setJobs(response.data);
            })
    }, [])

    const handleClose = () => {
        setClickedJob(null);
        setShowModal(false);
    };

    const handleShow = (index) => {
        axios.get('/api/job/' + index)
            .then((response) => {
                setClickedJob(response.data);
            })

        setShowModal(true);
    };

    return (
        <MainLayout>
            <Head title="Job Search"/>

            <PageSection className={"bg-white"} fullWidth={true}>
                <FancyTitle heading={t("Find Your Perfect Job").toUpperCase()} subtitle={toTitleCase(t("Discover opportunities today"))}/>

                <div className="row justify-content-center">
                    <div className="col-12 col-sm-2">
                        <h3 className='fw-bold'>{t("Filters")}:</h3>
                        <hr/>
                        <div className="col-12">
                            <p className="fw-bold">{t("Location")}:</p>
                            <div>
                                <input className="form-check-inline" type="checkbox" id="remote"/>
                                <label htmlFor="remote" className="form-check-label">{t("Remote jobs")}</label>
                            </div>

                            <div>
                                <input className="form-check-inline" type="checkbox" id="hybrid"/>
                                <label htmlFor="hybrid" className="form-check-label">{t("Hybrid jobs")}</label>
                            </div>

                            <div>
                                <input className="form-check-inline" type="checkbox" id="on_location"/>
                                <label htmlFor="on_location" className="form-check-label">{t("On location")}</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-9">
                        <div className="row justify-content-center">
                            {jobs.length > 0 && jobs.map((job) => {
                                return (
                                    <div onClick={() => handleShow(job.id)} key={job.id} className="col-11 col-md-6 col-xl-3 my-3 d-flex">
                                        {JobCard({job})}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </PageSection>

            {clickedJob &&
                <Modal show={showModal} size={'lg'} fullscreen={"sm-down"} centered onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="fw-bold">{clickedJob.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*TODO Complete detailed */}
                        <div>
                            {clickedJob.description.substring(0, 1000)}
                        </div>
                        <hr/>
                        <div className="my-3">
                            <span className="fw-bold">{t("Employer info")}:</span>
                            <div>
                                {clickedJob.company_data.full_name}
                            </div>
                            <div>
                                {clickedJob.company_data.street}, <br />
                                {clickedJob.company_data.zip + " " + clickedJob.company_data.city}
                            </div>
                            <div>
                                {clickedJob.company_data.contact_phone}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" target='_blank' href={'/job/'+clickedJob.id}>
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

