import {Head} from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout.tsx';
import PageSection from "./Parts/PageSection.tsx";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "../Components/FancyTitle.tsx";
import JobCard from "../Components/JobCard";
import {toTitleCase} from "../Helpers";
import axios from "axios";
import {useEffect, useState} from "react";
import {CardContainer} from "../Styles/SharedStyles";


export default function JobSearch() {
    const {t} = useLaravelReactI18n();
    const [jobs, setJobs] = useState([]);
    // const {data, setData, get} = useForm();

    function getJobs() {
        axios.get('/api/jobs')
            .then((response) => {
                setJobs(response.data);
            })
    }

    useEffect(() => {
        getJobs();
    }, []);
    return (
        <MainLayout>
            <Head title="Job Search"/>

            <PageSection className={"bg-white col-12"} fullWidth={true}>
                <FancyTitle heading={t("Find Your Perfect Job").toUpperCase()} subtitle={toTitleCase(t("Discover opportunities today"))}/>

                <div className="row mb-5">
                    <div className="col-2">
                        <h3 className='fw-bold'>{t("Filters")}:</h3>
                        <hr/>
                        <div>
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
                    <div className="col-9">
                        <div className="row flex-grow-1">
                            {jobs.length > 0 && jobs.map((job, index) => {
                                return (
                                    <CardContainer key={index} className="col-12 col-md-3 my-3">
                                        {JobCard({job, index})}
                                    </CardContainer>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </PageSection>
        </MainLayout>
    );
}

