import {formatDate, formatText, parseEmploymentType} from "@/Helpers";
import {CompanyData, JobInterface} from "@/Interfaces/SharedInterfaces";
import {useLaravelReactI18n} from "laravel-react-i18n";
import React from "react";
import {parseMethodOfPayment} from "@/Helpers/Helpers";

type CustomJobInterface = JobInterface & CompanyData;

interface ComponentProps {
    job: CustomJobInterface,
    isDrafted?: boolean
}

export default function JobCard({job, isDrafted = false}: ComponentProps) {
    const {t} = useLaravelReactI18n();
    const {title, description} = parseMethodOfPayment(job);

    return (
        <div className={"card w-100 h-100 border shadow " + (isDrafted ? "" : "card-grow")}>
                <div className="card-header bg-dark d-flex " style={{minHeight: 85}}>
                    <div className="align-self-center mx-auto">
                        <p className="fw-bold text-center my-auto text-white">{job.title}</p>
                    </div>
                </div>
            {!isDrafted ?
                    <>
                        <div className="card-body mb-4">
                            <div>
                                <p className="m-0"><span
                                    className="fw-bold">{t("Work location")}</span>: {t(formatText(job.work_location))}
                                </p>
                                <p className="m-0"><span
                                    className="fw-bold">{t("Employment type")}</span>: {t(parseEmploymentType(job.employment_type))}
                                </p>
                                <p className="m-0">
                                    <span className="fw-bold me-2">
                                        {title}:
                                    </span>
                                    {description}
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

                        <small className="card-footer">
                            <p className="m-0 text-end">{t("Application deadline") + ": " + formatDate(job.expires_at)}</p>
                            <p className="m-0 text-end">{t("Published") + ": " + formatDate(job.posted_at)}</p>
                            <div className="mt-2 border-top pt-2 text-center">
                                <div>
                                    <small>{job.name}</small>
                                </div>
                            </div>
                        </small>
                    </>

                :
                <div className='blur'>
                    <div className="card-body mb-4">
                        <div className="card-text">
                            <div className="col-12 mb-1 fw-bold">
                                {t("Description")}:
                            </div>
                            <div className="placeholder col-12">
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
                }
        </div>
    )
}
