import React, {useRef, useState} from "react";
import {Modal} from "react-bootstrap";
import {JobInterface} from "@/Interfaces/SharedInterfaces";
import {useLaravelReactI18n} from "laravel-react-i18n";
import Explosion from "react-canvas-confetti/dist/presets/explosion";
import axios from "axios";

interface ComponentProps {
    showModal: boolean,
    handleClose: () => void,
    job: JobInterface
}

export default function ApplyModal({showModal, handleClose, job}: ComponentProps) {
    const {t} = useLaravelReactI18n();
    const [successfullyApplied, setSuccessfullyApplied] = useState(false);
    const [errors, setErrors] = useState<string[]>([])
    const coverLetterRef = useRef<HTMLTextAreaElement>(null);
    const [responseLoading, setResponseLoading] = useState(false);

    const handleApplyClick = () => {
        setResponseLoading(true);
        setErrors([]);
        if (coverLetterRef.current) {
            axios.post(`/job/${job.id}/apply`, {
                cover: coverLetterRef.current.value
            })
                .then(() => {
                    setSuccessfullyApplied(true);
                    setResponseLoading(false);
                })
                .catch(error => {
                    setErrors(error.response.data.errors)
                })
        }
    }

    const handleHide = () => {
        setSuccessfullyApplied(false);
        handleClose()
    }

    return (
        <Modal show={showModal} size={'xl'} fullscreen={"sm-down"} centered onHide={handleHide}>
            <Modal.Header closeButton>
                <Modal.Title>{t("You are about to apply for the position \":jobPosition\"", {jobPosition: job.title})}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!successfullyApplied ?
                    <div className="col-12">
                        <label htmlFor="cover" className="form-label">
                            {t("Enter you cover letter (optional)")}:
                        </label>
                        <textarea
                            ref={coverLetterRef}
                            className="form-control"
                            name="cover_letter"
                            id="cover"
                            placeholder={`${t("Enter text")}...`}
                            cols={30}
                            rows={10}
                            style={{whiteSpace: 'pre-line'}}
                        ></textarea>
                    </div>
                    :
                    <div className="col-12">
                        <div className="alert alert-success text-center">
                            <div>
                                <h3 className='fs-1'>🎉</h3>
                            </div>
                            <div className="fw-semibold">
                                {t("Fingers crossed!")}
                            </div>
                            <div>
                                {t("Your application has been sent successfully!")}
                            </div>
                        </div>
                        <Explosion
                            globalOptions={{
                                useWorker: true
                            }}
                            autorun={{speed: 0.01}}
                            decorateOptions={() => {
                                return {
                                    particleCount: 500,
                                    spread: 360,
                                    shapes: ['square', 'circle'],
                                    ticks: 600,
                                    gravity: 1.5,
                                    origin: {x: 0.5, y: 0.5},
                                }
                            }}
                        />
                    </div>
                }

                    {errors.length > 0 &&
                        <div className="alert alert-danger">
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
                        {!successfullyApplied && <button className="btn btn-primary me-2" disabled={responseLoading}
                                                         onClick={() => handleApplyClick()}>{t("Apply")}</button>}
                        <button className="btn btn-secondary" onClick={handleClose}>{t("Cancel")}</button>
                    </div>
                }
            </Modal.Footer>
        </Modal>
    )
}
