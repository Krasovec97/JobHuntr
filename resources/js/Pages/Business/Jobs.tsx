import {useLaravelReactI18n} from "laravel-react-i18n";
import {Head, usePage} from "@inertiajs/react";
import BusinessLayout from "../../Layouts/BusinessLayout";
import PageSection from "../../Components/PageSection";
import CompanyQuickView from "../Parts/CompanyQuickView";
import FancyTitle from "../../Components/FancyTitle";
import styled from "styled-components";
import {CompanyData, CompanyAuthProps, JobInterface} from "@/Interfaces/SharedInterfaces";
import {capitalize, formatText, numberFormat} from "@/Helpers";
import React from "react";

interface JobsProps {
    companyJobs: Array<JobInterface>
}

export default function Jobs({companyJobs}: JobsProps) {
    const {t} = useLaravelReactI18n();
    let company: CompanyData = usePage<CompanyAuthProps>().props.auth.company;

    return (
        <BusinessLayout>
            <Head title={t("[Business] Jobs")} />

            <PageSection className={'bg-white full-h'}>
                <CompanyQuickView company={company} />

                <FancyTitle heading={t("Jobs overview")} subtitle={t("List of all of your jobs")}/>

                <div className={"row mb-3"}>
                    <div className="col-12 text-end">
                        <a href="/jobs/new" className={"btn btn-outline-primary"}>{t("Create a new job")}</a>
                    </div>
                </div>

                <div className={"row bg-primary text-white py-3"}>
                    <div className="col-2 col-md-2 fw-bold">{t("Title")}</div>
                    <div className="col-2 fw-bold d-none d-md-block">{t("Work field")}</div>
                    <div className="col-2 fw-bold d-none d-md-block">{t("Work location")}</div>
                    <div className="col-2 fw-bold d-none d-md-block">{t("Method of payment")}</div>
                    <div className="col-2 fw-bold d-none d-md-block">{t("Amount")}</div>
                    <div className="col-2 col-md-2 fw-bold">{t("Status")}</div>
                </div>


                {companyJobs.map((job) => {
                    return (
                        <TableRow href={"/job/" + job.id} className={"row py-3 text-decoration-none text-dark border-bottom border-dark border-opacity-25"} key={job.id}>
                            <div className="col-2 col-md-2">{job.title}</div>
                            <div className="col-2 d-none d-md-block">{job.work_field?.name}</div>
                            <div className="col-2 d-none d-md-block">{t(formatText(job.work_location))}</div>
                            <div className="col-2 d-none d-md-block">{t(capitalize(job.method_of_payment))}</div>
                            <div className="col-2 d-none d-md-block">
                                {
                                    job.method_of_payment === 'salary' ?
                                        t("From") + ' ' + numberFormat(job.salary_from, job.salary_currency)
                                        :
                                        numberFormat(job.hourly_rate, job.salary_currency)
                                }
                            </div>
                            <div className="col-2 col-md-2">{t(capitalize(job.status))}</div>
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
