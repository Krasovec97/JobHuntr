import {Modal} from "react-bootstrap";
import React, {useState} from "react";
import {JobInterface} from "@/Interfaces/SharedInterfaces";
import {useLaravelReactI18n} from "laravel-react-i18n";
import axios from "axios";
import DatePicker, {registerLocale} from "react-datepicker";
import {sl} from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
registerLocale('sl', sl)

interface ComponentProps {
    showModal: boolean,
    handleClose: () => void,
    job: JobInterface
}

export default function ActivateJobListingModal({showModal, handleClose, job}: ComponentProps) {
    const {t} = useLaravelReactI18n();
    const [jobActivated, setJobActivated] = useState(false);
    const [errors, setErrors] = useState<string[]>([])
    const [responseLoading, setResponseLoading] = useState(false);
    const [date, setDate] = useState<Date>(new Date());

    let publishJobListingButton = () => {
        setErrors([]);

        setResponseLoading(true);

        axios.post(`/job/${job.id}/activate`, {
            expires_at: date
        })
            .then(() => {
                setJobActivated(true);
                setResponseLoading(false);
            })
            .catch((response) => {
                setErrors(response.data.errors)
            })
    }

    const handleHide = () => {
        if (jobActivated) {
            window.location.reload();
        } else {
            handleClose();
        }
    }


    return (
        <Modal show={showModal} size={'lg'} fullscreen={"sm-down"} centered onHide={handleHide}>
            <Modal.Header closeButton>
                <Modal.Title>{t("You are about to active a job posting for: \":jobPosition\"", {jobPosition: job.title})}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!jobActivated ?
                    <div className="col-12">
                        <label htmlFor="expires_at" className="form-label">
                            {t("Application deadline")}:
                        </label>
                        <div className="col-4">
                            <DatePicker
                                locale={"sl"}
                                dateFormat={"dd.MM.yyyy"}
                                minDate={new Date()}
                                className="form-control"
                                selected={date}
                                onChange={(date) => setDate(date!)} />
                        </div>
                    </div>
                    :
                    <div className="col-12">
                        <div className="alert alert-success text-center">
                            <div>
                                <h3 className='fs-1'>🎉</h3>
                            </div>
                            <div className="fw-semibold">
                                {t("Job activated")}
                            </div>
                            <div>
                                {t("This job posting was activated successfully! It will now be visible to all users.")}
                            </div>
                        </div>
                    </div>
                }

                {errors.length > 0 &&
                    <div className="alert alert-danger my-3">
                        {errors.map((error) => {
                            return <div>{error}</div>
                        })
                        }
                    </div>
                }

            </Modal.Body>
            <Modal.Footer>
                {responseLoading ?
                    <div className="spinner-grow text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    :
                    <div className="text-end">
                        {!jobActivated && <button className="btn btn-primary me-2" disabled={responseLoading}
                                                         onClick={() => publishJobListingButton()}>{t("Submit")}</button>}
                        <button className="btn btn-secondary" onClick={handleHide}>{t("Cancel")}</button>
                    </div>
                }
            </Modal.Footer>
        </Modal>
    )
}
