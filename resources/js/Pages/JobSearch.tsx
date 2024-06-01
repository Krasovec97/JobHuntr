import {Head, useForm} from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout.tsx';
import PageSection from "./Parts/PageSection.tsx";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "../Components/FancyTitle.tsx";
import JobCard from "../Components/JobCard";
import {toTitleCase} from "../Helpers";
import axios from "axios";
import {useEffect, useState} from "react";


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

            <PageSection className={"bg-white"}>
                <FancyTitle heading={t("Find Your Perfect Job").toUpperCase()} subtitle={toTitleCase(t("Discover opportunities today"))}/>

                <div className="row mb-5">

                    {jobs.length > 0 && jobs.map((job, index) => JobCard({job, index}))}
                </div>
            </PageSection>
        </MainLayout>
    );
}


