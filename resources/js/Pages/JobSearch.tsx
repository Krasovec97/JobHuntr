import {Head} from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageSection from "@/Components/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "@/Components/FancyTitle";
import JobCard from "@/Components/JobCard";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {CompanyData, FilterTypes, JobInterface} from "@/Interfaces/SharedInterfaces";
import JobFilters from "@/Components/JobFilters";
import styled from "styled-components";
import JobPostModal from "@/Components/JobPostModal";

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
        employment_types: [],
        search_string: '',
        work_fields_string: '',
        education_id: null,
        regions_string: ''
    });

    useEffect(() => {
        let url = '/api/jobs';
        url = `${url}?location=${filters.location.join(',')}`;

        let queryParamArguments = [
            `employment_types=${filters.employment_types.join(',')}`,
            `search_string=${filters.search_string.toUpperCase()}`,
            `work_fields_ids=${filters.work_fields_string}`,
            `radius=${filters.radius}`,
            `regions=${filters.regions_string}`
        ]

        if (filters.current_position && filters.current_position.latitude && filters.current_position.longitude) {
            queryParamArguments.push(
                `current_coords=${filters.current_position.longitude},${filters.current_position.latitude}`,
            )
        }

        if (filters.education_id) {
            queryParamArguments.push(`education_id=${filters.education_id}`)
        }

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
                    <MenuSidebar className="col-12 col-sm-2">
                        <JobFilters filters={filters} setFilters={setFilters} totalJobsCount={totalJobsCount} currentJobsCount={currentJobsCount}/>
                    </MenuSidebar>
                    <PageContent className="col-12 col-sm-9">
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
                    </PageContent>
                </div>
            </PageSection>

            {clickedJob && <JobPostModal showModal={showModal} clickedJob={clickedJob} handleClose={handleClose} />}
        </MainLayout>
    );
}

let MenuSidebar = styled.div`
    @media only screen and (min-width: 800px) {
        top: 150px;
        left: 0;
        margin-right: 40px;
        min-width: 0;
        max-width: 300px;
        overflow: scroll !important;
    }
`

let PageContent = styled.div`
    @media only screen and (min-width: 800px) {
        position: relative;
        width: calc(90% - 300px);
    }
`
