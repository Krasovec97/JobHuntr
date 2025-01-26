import {Button, Modal} from "react-bootstrap";
import {formatText, numberFormat, parseEmploymentType} from "@/Helpers";
import React from "react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {CompanyData, JobInterface} from "@/Interfaces/SharedInterfaces";
import IconWithText from "@/Components/IconWithText";
import {formatJobLocation} from "@/Helpers/Helpers";

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
                <div className="mb-3">
                    <div className="d-flex justify-content-evenly">
                        {clickedJob.company_data.id !== 1 &&
                            <IconWithText
                                icon={<i className="fa-solid fa-user-tie my-auto" title={t('Employer')}></i>}
                                text={clickedJob.company_data.full_name}/>
                        }

                        <IconWithText
                            icon={<i className="fa-solid fa-earth-europe my-auto" title={t("Job location")}></i>}
                            text={formatJobLocation(clickedJob)}/>

                        <IconWithText
                            icon={<i className="fa-solid fa-hand-holding-dollar my-auto"
                                     title={clickedJob.method_of_payment === 'salary' ? t("Salary") : t("Hourly rate")}></i>}
                            text={clickedJob.method_of_payment === 'salary' ? numberFormat(clickedJob.salary_from, clickedJob.salary_currency) : numberFormat(clickedJob.hourly_rate, clickedJob.salary_currency)}/>
                    </div>
                </div>
                <div className="border-bottom mb-3 pb-2">
                    <p className="fw-bold m-0">{t("Employment type")}</p>
                    {t(parseEmploymentType(clickedJob.employment_type))}
                </div>
                <div className="border-bottom mb-3 pb-2">
                    <p className="fw-bold m-0">{t("Work Location")}</p>
                    {t(formatText(clickedJob.work_location))}
                </div>
                <div className="border-bottom mb-3 pb-2">
                    <p className="fw-bold m-0">{t("Main Tasks")}</p>
                    <div className="col-12"
                         dangerouslySetInnerHTML={{__html: clickedJob.assignments}}>
                    </div>
                </div>

                <div className="border-bottom mb-3 py-2">
                    <p className="fw-bold m-0">{t("What We Offer")}</p>
                    <div className="col-12"
                         dangerouslySetInnerHTML={{__html: clickedJob.benefits}}>
                    </div>
                </div>

                <div className="border-bottom mb-3 py-2">
                    <p className="fw-bold m-0">{t("What We Expect")}</p>
                    <div className="col-12"
                         dangerouslySetInnerHTML={{__html: clickedJob.expectations}}>
                    </div>
                </div>

                <div className={`${clickedJob.company_data.id !== 1 && 'border-bottom'} mb-3`}>
                    <p className="fw-bold m-0">{t("Work field")}</p>
                    {clickedJob.work_field?.name}
                </div>

                <div className="my-3">
                    {clickedJob.company_data.id !== 1 &&
                        <>
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
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">
                    {t("Apply now")}
                </Button>
                <Button variant="outline-primary" target='_blank' href={'/job/' + clickedJob.id}>
                    {t("See more details")}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
