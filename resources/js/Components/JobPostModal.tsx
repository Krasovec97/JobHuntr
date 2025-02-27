import {Button, Modal} from "react-bootstrap";
import {formatText, parseEmploymentType} from "@/Helpers";
import React from "react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {CompanyData, JobInterface} from "@/Interfaces/SharedInterfaces";
import IconWithText from "@/Components/IconWithText";
import {formatJobLocation, parseMethodOfPayment} from "@/Helpers/Helpers";
import ApplyButton from "@/Components/ApplyButton";

type JobWithCompanyData = JobInterface & {
    company_data: CompanyData
};

interface ModalProps {
    showModal: boolean,
    clickedJob: JobWithCompanyData,
    handleClose: () => void,
    handleShowApplyModal: () => void,
}

export default function JobPostModal({showModal, clickedJob, handleClose, handleShowApplyModal}: ModalProps) {
    const {t} = useLaravelReactI18n();
    const {title, description} = parseMethodOfPayment(clickedJob);

    return (
        <Modal show={showModal} size={'xl'} fullscreen={"sm-down"} centered onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">{clickedJob.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <div className="row">
                        {clickedJob.company_data.id !== 1 &&
                            <IconWithText
                                icon={<i className="fa-solid fa-user-tie my-auto" title={t("Employer info")}></i>}
                                text={clickedJob.company_data.name}/>
                        }

                        <IconWithText
                            icon={<i className="fa-solid fa-earth-europe my-auto" title={t("Work location")}></i>}
                            text={formatJobLocation(clickedJob)}/>

                        <IconWithText
                            icon={<i className="fa-solid fa-hand-holding-dollar my-auto"
                                     title={title}></i>}
                            text={description}/>
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
                <div className="border-bottom mb-3 ">
                    <p className="fw-semibold text-primary">{t("Main Tasks")}</p>
                    <div className="col-12"
                         dangerouslySetInnerHTML={{__html: clickedJob.assignments}}>
                    </div>
                </div>

                <div className="border-bottom mb-3">
                    <p className="fw-bold text-primary">{t("What We Offer")}</p>
                    <div className="col-12"
                         dangerouslySetInnerHTML={{__html: clickedJob.benefits}}>
                    </div>
                </div>

                <div className="border-bottom mb-3 pb-3">
                    <p className="fw-bold text-primary">{t("What We Expect")}</p>
                    <div className="col-12"
                         dangerouslySetInnerHTML={{__html: clickedJob.expectations}}>
                    </div>
                </div>

                <div className={`${clickedJob.company_data.id !== 1 && 'border-bottom'} mb-3`}>
                    <p className="fw-bold m-0">{t("Work field")}</p>
                    {clickedJob.work_field?.name ? t(clickedJob.work_field?.name!) : ''}
                </div>

                {clickedJob.education &&
                    <div className="border-bottom mb-3 pb-2">
                        <p className="fw-bold m-0">{t("Minimal education required")}</p>
                        {clickedJob.education}
                    </div>
                }

                <div className="my-3">
                    {clickedJob.company_data.id !== 1 &&
                        <>
                            <span className="fw-bold">{t("Employer info")}:</span>
                            <div>
                                {clickedJob.company_data.name}
                            </div>
                            <div>
                                {clickedJob.company_data.street}
                            </div>
                        </>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="col-12">
                    <ApplyButton handleApplyClick={() => handleShowApplyModal()}/>
                </div>
                <div className={"col-12 text-end"}>
                    <Button variant="outline-primary" rel={"canonical"} target='_blank' href={'/job/' + clickedJob.id}>
                        {t("See more details")}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
