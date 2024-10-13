import {Button, Modal} from "react-bootstrap";
import {formatText, numberFormat} from "@/Helpers";
import React from "react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {CompanyData, JobInterface} from "@/Interfaces/SharedInterfaces";

type JobWithCompanyData = JobInterface & {
    company_data: CompanyData
};

interface ModalProps {
    showModal: boolean,
    clickedJob: JobWithCompanyData,
    handleClose: () => void
}

export default function JobPostModal({showModal, clickedJob, handleClose}: ModalProps) {
    const {t} = useLaravelReactI18n();
    return (
        <Modal show={showModal} size={'lg'} fullscreen={"sm-down"} centered onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">{clickedJob.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="border-bottom mb-3">
                    <p className="fw-bold m-0">{t("Employment type")}</p>
                    {t(formatText(clickedJob.employment_type))}
                </div>
                <div className="border-bottom mb-3">
                    <p className="fw-bold m-0">{clickedJob.method_of_payment === 'salary' ? t("Salary") : t("Hourly rate")}</p>
                    {numberFormat(clickedJob.salary_from, clickedJob.salary_currency)}
                </div>
                <div className="border-bottom mb-3">
                    <p className="fw-bold m-0">{t("Work field")}</p>
                    {clickedJob.work_field?.name}
                </div>
                <div className="border-bottom mb-3">
                    <p className="fw-bold m-0">{t("Work Location")}</p>
                    {formatText(clickedJob.work_location)}
                </div>
                <div className="border-bottom mb-3">
                    <p className="fw-bold m-0">{t("Description")}</p>
                    <div className="col-12"
                         dangerouslySetInnerHTML={{__html: clickedJob.intro}}>
                    </div>
                </div>

                <div className="border-bottom mb-3">
                    <p className="fw-bold m-0">{t("Job application email")}</p>
                    <a href={"mailto:" + clickedJob.application_mail}>{clickedJob.application_mail}</a>
                </div>

                <div className="my-3">
                    {clickedJob.company_data.id !== 1 ? <>
                            <span className="fw-bold">{t("Employer info")}:</span>
                            <div>
                                {clickedJob.company_data.full_name}
                            </div>
                            <div>
                                {clickedJob.company_data.street}, <br/>
                                {clickedJob.company_data.zip + " " + clickedJob.company_data.city}
                            </div>
                            <div>
                                {clickedJob.company_data.contact_phone}
                            </div>
                        </>
                        :
                        <div className="text-end">
                            <small className="my-auto fw-light fst-italic">{t("This job was posted by JobHuntr")}</small>
                        </div>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" target='_blank' href={'/job/' + clickedJob.id}>
                    {t("See more details")}
                </Button>
                <Button variant="dark" onClick={handleClose}>
                    {t("Close")}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
