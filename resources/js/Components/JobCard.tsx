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
        <>
            <div key={index} className={"col-6 col-xxl-3 border rounded-4 shadow p-3 " + (isDrafted ? "" : "card-grow")}>
                <p className="fw-bold text-center h5">{job.title}</p>

                <hr/>
                {!isDrafted ? (
                    <>
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

                        <hr/>

                        <p className="m-0 text-grey text-end">{t("Published") + ": " + formatDate(job.posted_at)}</p>
                    </>
                )
                :
                (
                    <div className='blur'>
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
                        <p className="m-0">Need a job at JobHuntr? You probably seem to be looking at this code. </p>

                        <hr/>

                        <p className="m-0 text-grey text-end">Published: January 1, 1983</p>

                    </div>
                )
                }
            </div>
        </>
    )
}
