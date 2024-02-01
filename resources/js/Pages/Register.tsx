import GuestLayout from '../Layouts/GuestLayout.js';
import {Head, router} from '@inertiajs/react';
import PageSection from "./Parts/PageSection";
import {useMultistepForm} from "../Hooks/useMultistepForm";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {AccountTypeSelection} from "./Parts/FormParts/AccountTypeSelection";
import {AccountForm} from "./Parts/FormParts/AccountForm";
import {AddressForm} from "./Parts/FormParts/AddressForm";
import React, {FormEvent, useEffect, useState} from "react";
import {CompanyForm} from "./Parts/FormParts/CompanyForm";
import {PersonalForm} from "./Parts/FormParts/PersonalForm";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Button, Modal} from "react-bootstrap";


type FormDataType = {
    is_business_account: boolean,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    street: string,
    city: string,
    country: string,
    zip: string,
    email: string,
    password: string,
    registration_house: string,
    company_full_name: string,
    company_short_name: string,
    registration_number: string,
    company_vat_id: string,
    is_vat_obligated: boolean,
    contact_person: string,
    contact_phone: string
}

let INITIAL_DATA:FormDataType = {
    is_business_account: false,
    first_name: "",
    last_name: "",
    date_of_birth: "",
    street: "",
    city: "",
    country: "",
    zip: "",
    email: "",
    password: "",
    registration_house: "",
    company_full_name: "",
    company_short_name: "",
    registration_number: "",
    company_vat_id: "",
    is_vat_obligated: false,
    contact_person: "",
    contact_phone: ""
}

export default function Register() {
    const [data, setData] = useState(INITIAL_DATA);
    const [showSuccesModal, setShowSuccesModal] = useState(false);
    const [postUrl, setPostUrl] = useState('');

    const handleClose = () => setShowSuccesModal(false);
    const handleShow = () => setShowSuccesModal(true);

    function updateFields(fields: Partial<FormDataType>, goToNextStep: boolean = false) {
        setData(prevState => {
            return {...prevState, ...fields};
        })

        if (goToNextStep) {
            next();
        }
    }

    const {t} = useLaravelReactI18n();

    const businessSteps = [
        <AccountTypeSelection {...data} updateFields={updateFields}  />,
        <CompanyForm {...data} updateFields={updateFields} />,
        <AddressForm {...data} updateFields={updateFields} />,
        <AccountForm {...data} updateFields={updateFields} />
    ];

    const personalSteps = [
        <AccountTypeSelection {...data} updateFields={updateFields}  />,
        <PersonalForm {...data} updateFields={updateFields} />,
        <AddressForm {...data} updateFields={updateFields} />,
        <AccountForm {...data} updateFields={updateFields} />,
    ];
    const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } = useMultistepForm(data.is_business_account ? businessSteps : personalSteps );

    let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");



    function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!isLastStep) return next();

        if (data.is_business_account) {
            setPostUrl('register/company');
        } else {
            setPostUrl('register/personal');
        }

        router.post(postUrl, data, {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
            onStart: () => {

            },
            onError: (errors) => {
                alert(errors);
            },
            onSuccess: () => {
                handleShow();
            }
        });
    }

    return (
        <GuestLayout>
            <Head title="Register" />
            <PageSection className={"bg-white full-h"}>
                <div className="row">
                    <form className={"col-9 mx-auto mt-5"} onSubmit={onSubmit}>
                        <div className="col-12 text-center">
                            {
                                !isFirstStep &&  (
                                    <div className={"row justify-content-center gap-4 align-middle"}>
                                        {steps.map((step, index) => {
                                            if(index >= 1) {
                                                let classNames = "col-auto rounded-5 py-1 ";

                                                const isStepCompleted: boolean = index < currentStepIndex;
                                                if (isStepCompleted) classNames += " bg-primary text-white"

                                                const isCurrentStep: boolean = index === currentStepIndex;
                                                if (isCurrentStep) classNames += "border border-primary border-3 bg-primary text-white"

                                                const isStepInFuture: boolean = index > currentStepIndex;
                                                if (isStepInFuture) classNames += " border text-primary border-primary border-3"


                                                return (
                                                    <div className={classNames} key={index}>
                                                        {isStepCompleted ? <i className="fa-solid fa-check align-middle"></i> : index}
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                )
                            }

                        </div>

                        {step}

                        <div className={"col-7 mx-auto text-end mt-4"}>
                            {!isFirstStep &&
                                <button onClick={back} type="button" className="btn btn-outline-primary">{t("Back")}</button>}

                            {!isFirstStep &&
                                <button type="submit"
                                        className="ms-3 btn btn-primary">{isLastStep ? t("Submit") : t("Next")}</button>}
                        </div>
                    </form>
                </div>
            </PageSection>

            <Modal show={showSuccesModal} size={"lg"} centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("Account created!")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>{t("We are happy that you decided to join us!")}</p>
                        <p>{t("We've sent an confirmation link to your email account, please verify your email to login!")}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} href={"/login"}>
                        {t("Close")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </GuestLayout>
    );
}
