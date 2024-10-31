import {formatDate, formatText, numberFormat} from "@/Helpers";
import {JobInterface} from "@/Interfaces/SharedInterfaces";
import {useLaravelReactI18n} from "laravel-react-i18n";
import React from "react";

interface ComponentProps {
    job: JobInterface,
    isDrafted?: boolean
}

export default function JobCard({job, isDrafted = false}: ComponentProps) {
    const {t} = useLaravelReactI18n();

    return (
        <div className={"card w-100 h-100 border shadow " + (isDrafted ? "" : "card-grow")}>
                <div className="card-header bg-dark d-flex " style={{minHeight: 85}}>
                    <div className="align-self-center mx-auto">
                        <p className="fw-bold text-center my-auto text-white">{job.title}</p>
                    </div>
                </div>
            {!isDrafted ? (
                    <>
                        <div className="card-body mb-4">
                            <div>
                                <p className="m-0"><span
                                    className="fw-bold">{t("Work location")}</span>: {t(formatText(job.work_location))}
                                </p>
                                <p className="m-0"><span
                                    className="fw-bold">{t("Employment type")}</span>: {t(formatText(job.employment_type))}
                                </p>
                                <p className="m-0">
                                    <span className="fw-bold">
                                        {job.method_of_payment === 'salary' ? t("Starting Salary") : t("Hourly rate")}
                                    </span>: {
                                    job.method_of_payment === 'salary' ? numberFormat(job.salary_from, job.salary_currency) : numberFormat(job.hourly_rate, job.salary_currency)
                                }
                                </p>
                            </div>
                            <div className="card-text mt-3">
                                <div className="col-12 mb-1 fw-bold">
                                    {t("Short company introduction")}:
                                </div>
                                <div className="col-12" dangerouslySetInnerHTML={{__html: job.intro}}>
                                </div>
                            </div>

                        </div>

                        <div className="card-footer">
                            <p className="m-0 text-end">{t("Published") + ": " + formatDate(job.posted_at)}</p>
                        </div>
                    </>
                )
                :
                (
                    <div className='blur'>
                        <div className="card-body mb-4">
                            <div className="card-text">
                                    <div className="col-12 mb-1 fw-bold">
                                        {t("Description")}:
                                    </div>
                                    <div className="col-12">
                                        <p>Dont try to read this there is no info...</p>
                                    </div>
                                </div>

                                <p className="m-0">This is just some random text...</p>
                                <p className="m-0">There is probably a million positions open</p>
                                <p className="m-0">Greetings Mr. Inspector.</p>
                            </div>

                            <div className="card-footer">
                                <p className="m-0 text-grey text-end">Published: January 1, 1983</p>
                            </div>
                        </div>
                    )
                }
        </div>
    )
}
