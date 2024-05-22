import {useLaravelReactI18n} from "laravel-react-i18n";
import {CompanyData} from "../../Interfaces/GlobalTypes";
import {Head, usePage} from "@inertiajs/react";
import BusinessLayout from "../../Layouts/BusinessLayout";
import PageSection from "../Parts/PageSection";
import CompanyQuickView from "../Parts/CompanyQuickView";
import FancyTitle from "../../Components/FancyTitle";
import styled from "styled-components";
import {JobInterface} from "../../Interfaces/SharedInterfaces";
import {capitalize, formatText, numberFormat} from "../../Helpers";

interface JobsProps {
    companyJobs: Array<JobInterface>
}

export default function Jobs({companyJobs}: JobsProps) {
    const {t} = useLaravelReactI18n();
    let company: CompanyData = usePage().props.auth.company;

    return (
        <BusinessLayout>
            <Head title={t("[Business] Jobs")} />

            <PageSection className={'bg-white full-h'}>
                <CompanyQuickView company={company} />

                <FancyTitle heading={"Jobs overview"} subtitle={"List of all of your jobs"}/>

                <div className={"row mb-3"}>
                    <div className="col-12 text-end">
                        <a href="/jobs/new" className={"btn btn-outline-primary"}>{t("Create a new job")}</a>
                    </div>
                </div>

                <div className={"row bg-primary text-white py-3"}>
                    <div className="col-2 fw-bold">{t("Job Title")}</div>
                    <div className="col-2 fw-bold">{t("Job Description")}</div>
                    <div className="col-2 fw-bold">{t("Work field")}</div>
                    <div className="col-2 fw-bold">{t("Work location")}</div>
                    <div className="col-2 fw-bold">{t("Yearly salary")}</div>
                    <div className="col-2 fw-bold">{t("Job status")}</div>
                </div>


                {companyJobs.map((job) => {
                    return (
                        <TableRow href={"/job/" + job.id} className={"row py-3 text-decoration-none text-dark border-bottom border-dark border-opacity-25"} key={job.id}>
                            <div className="col-2">{job.title}</div>
                            <div className="col-2">{job.description.substring(0, 25)}...</div>
                            <div className="col-2">{job.work_field.name}</div>
                            <div className="col-2">{formatText(job.work_location)}</div>
                            <div className="col-2">{numberFormat(job.salary, job.salary_currency)}</div>
                            <div className="col-2">{capitalize(job.status)}</div>
                        </TableRow>
                    )
                })}

            </PageSection>

        </BusinessLayout>
    );
}

const TableRow = styled.a`
    transition: all ease-in-out 130ms;
    &:hover {
        color: #d30855 !important;
    }
`
