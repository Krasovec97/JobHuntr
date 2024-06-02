import {formatDate, formatText, numberFormat} from "../Helpers";
import {JobInterface} from "../Interfaces/SharedInterfaces";
import {useLaravelReactI18n} from "laravel-react-i18n";

interface ComponentProps {
    job: JobInterface,
    index: number
}

export default function JobCard({job, index}: ComponentProps, isDrafted = false) {
    const {t} = useLaravelReactI18n();

    return (
        <div key={index} className={"h-100 border rounded-4 shadow p-3 " + (isDrafted ? "" : "card-grow")}>
            <div className="h-100">
                <div>
                    <p className="fw-bold text-center h-25">{job.title}</p>
                    <hr/>
                </div>
                {!isDrafted ? (
                        <div className="h-50">
                            <div>
                                <div className="text-start">
                                    <div className="col-12 mb-1 fw-bold">
                                        {t("Description")}:
                                    </div>
                                    <div className="col-12">
                                        <p>{job.description.substring(0, 200)}...</p>
                                    </div>
                                </div>

                                <p className="m-0"><span
                                    className="fw-bold">{t("Work location")}</span>: {formatText(job.work_location)}</p>
                                <p className="m-0"><span
                                    className="fw-bold">{t("Open positions")}</span>: {job.open_positions_count}</p>
                                <p className="m-0"><span
                                    className="fw-bold">{t("Salary")}</span>: {numberFormat(job.salary, job.salary_currency)}
                                </p>
                            </div>

                            <div className="h-25">
                                <hr/>
                                <p className="m-0 text-grey text-end">{t("Published") + ": " + formatDate(job.posted_at)}</p>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='blur'>
                            <div>
                                <div className="text-start">
                                    <div className="col-12 mb-1 fw-bold">
                                        {t("Description")}:
                                    </div>
                                    <div className="col-12">
                                        <p>Dont try to read this there is no info...</p>
                                    </div>
                                </div>

                                <p className="m-0">This is just some random text...</p>
                                <p className="m-0">There is probably a million positions open</p>
                                <p className="m-0">Need a job at JobHuntr? You probably seem to be looking at this
                                    code. </p>
                            </div>

                            <div className="mt-auto">
                                <hr />
                                <p className="m-0 text-grey text-end">Published: January 1, 1983</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
