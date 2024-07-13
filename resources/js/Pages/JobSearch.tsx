import {Head} from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import PageSection from "../Components/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "../Components/FancyTitle";
import JobCard from "../Components/JobCard";
import {formatText, numberFormat} from "../Helpers";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {CompanyData, FilterTypes, JobInterface} from "../Interfaces/SharedInterfaces";
import JobFilters from "../Components/JobFilters";

type JobWithCompanyData = JobInterface & {
    company_data: CompanyData
};

export default function JobSearch() {
    const {t} = useLaravelReactI18n();
    const [showModal, setShowModal] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [clickedJob, setClickedJob] = useState<JobWithCompanyData|null>(null);
    const [totalJobsCount, setTotalJobsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    let currentJobsCount = jobs.length;

    const [filters, setFilters] = useState<FilterTypes>({
        location: [],
        employment_type: [],
        search_string: '',
        work_areas_string: '',
        work_fields_string: ''
    });

    useEffect(() => {
        let url = '/api/jobs';
        url = `${url}?location=${filters.location.join(',')}`;

        let queryParamArguments = [
            `employment_type=${filters.employment_type.join(',')}`,
            `search_string=${filters.search_string.toUpperCase()}`,
            `work_area_ids=${filters.work_areas_string}`,
            `work_fields_ids=${filters.work_fields_string}`,
        ]

        url += `&${queryParamArguments.join('&')}`

        axios.get(url)
            .then((response) => {
                setLoading(false);
                setJobs(response.data.jobs);
                if (totalJobsCount === 0) setTotalJobsCount(response.data.total_jobs_count);
            })
    }, [filters]);

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
            <Head title="Job Search"/>

            <PageSection className={"bg-white min-vh-100"} fullWidth={true}>
                <FancyTitle heading={t("Find Your Perfect Job").toUpperCase()} subtitle={t("Discover opportunities today")}/>

                <div className="row justify-content-center">
                    <div className="col-12 col-sm-2">
                        <JobFilters filters={filters} setFilters={setFilters} totalJobsCount={totalJobsCount} currentJobsCount={currentJobsCount}/>
                    </div>
                    <div className="col-12 col-sm-9">
                        <div className="row justify-content-center justify-content-md-start">
                            {loading ?
                                <div className="spinner-grow text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                :
                                <>
                                {jobs.length > 0 ? jobs.map((job: JobInterface) => {
                                            return (
                                                <div onClick={() => handleShow(job.id)} key={job.id} className="col-11 col-md-6 col-xl-3 my-3 d-flex">
                                                    <JobCard job={job} />
                                                </div>
                                            )
                                        })
                                        :
                                        <div className="alert alert-primary justify-content-center text-center">
                                            <p className="fw-bold m-0">
                                                {t("No jobs match your filters!")}
                                            </p>
                                        </div>
                                    }
                                </>
                            }
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
                        <div className="border-bottom mb-3">
                            <p className="fw-bold m-0">{t("Employment type")}</p>
                            {t(formatText(clickedJob.employment_type))}
                        </div>
                        <div className="border-bottom mb-3">
                            <p className="fw-bold m-0">{t("Salary")}</p>
                            {numberFormat(clickedJob.salary, clickedJob.salary_currency)}
                        </div>
                        <div className="border-bottom mb-3">
                            <p className="fw-bold m-0">{t("Work area")}</p>
                            {clickedJob.work_area?.name}
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
                            {clickedJob.description}
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
                                    <small className="my-auto fw-light fst-italic">{t("This job was posted by JobHuntr")}</small>
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

