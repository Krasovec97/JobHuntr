
import React, {useEffect, useState} from 'react';
import {useLaravelReactI18n} from "laravel-react-i18n";
import {formatText, parseEmploymentType} from "@/Helpers";
import {TableRow} from "@/Pages/Business/Jobs";
import axios from "axios";
import {DateTime} from "luxon";


interface ApplicationProps {
    id: number,
    title: string,
    work_location: string,
    employment_type: string,
    created_at: string,
    company_name: string
}

export default function ApplicationHistory() {
    const {t} = useLaravelReactI18n();
    const [applications, setApplications] = useState<ApplicationProps[]>([]);

    useEffect(() => {
        axios.get('/user/applications')
            .then((response) => {
                setApplications(response.data);
            })
    }, []);

    return (
        <div className="row" style={{overflowX: "auto"}}>
            <div className="col-12">
                <div className={"row bg-primary text-white py-3"} style={{minWidth: "1200px"}}>
                    <div className="col-3 fw-bold">{t("Job Title")}</div>
                    <div className="col-3 fw-bold">{t("Company name")}</div>
                    <div className="col-3 fw-bold">{t("Employment type")}</div>
                    <div className="col-2 fw-bold">{t("Work location")}</div>
                    <div className="col-1 fw-bold">{t("Applied at")}</div>
                </div>

                {applications.map((application) => {
                    return (
                        <TableRow className={"row py-3 text-decoration-none text-dark border-bottom border-dark border-opacity-25"} key={application.id} style={{minWidth: "1200px"}}>
                            <div className="col-3 fw-bold">{application.title}</div>
                            <div className="col-3">{application.company_name}</div>
                            <div className="col-3">{t(parseEmploymentType(application.employment_type))}</div>
                            <div className="col-2">{t(formatText(application.work_location))}</div>
                            <div className="col-1" title={DateTime.fromISO(application.created_at).toFormat("H:m")}>
                                {DateTime.fromISO(application.created_at).toFormat("dd.MM.yyyy")}
                            </div>
                        </TableRow>
                    )
                })}
            </div>
        </div>
    )
}
