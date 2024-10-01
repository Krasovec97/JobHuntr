import MainLayout from '@/Layouts/MainLayout';
import {Head, useForm} from '@inertiajs/react';
import PageSection from "@/Components/PageSection";
import {useMultistepForm} from "@/Hooks/useMultistepForm";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {AccountTypeSelection} from "./Parts/FormParts/AccountTypeSelection";
import {AccountForm} from "./Parts/FormParts/AccountForm";
import {AddressForm} from "./Parts/FormParts/AddressForm";
import React, {FormEvent, useState} from "react";
import {CompanyForm} from "./Parts/FormParts/CompanyForm";
import {PersonalForm} from "./Parts/FormParts/PersonalForm";
import {Button, Modal} from "react-bootstrap";


type FormDataType = {
    is_business_account: boolean,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    email: string,
    password: string,
    registration_house: string,
    place_id: string,
    company_full_name: string,
    company_short_name: string,
    company_number: string,
    company_vat_id: string,
    is_vat_obligated: boolean,
    contact_person: string,
    contact_phone: string,
    coordinates: {
        longitude: number,
        latitude: number,
    },
    address: {
        street: string,
        city: string,
        country_code: string,
        zip: string,
    }
}

let INITIAL_DATA:FormDataType = {
    is_business_account: false,
    first_name: "",
    last_name: "",
    date_of_birth: "",
    place_id: "",
    email: "",
    password: "",
    registration_house: "",
    company_full_name: "",
    company_short_name: "",
    company_number: "",
    company_vat_id: "",
    is_vat_obligated: false,
    contact_person: "",
    contact_phone: "",
    coordinates: {
        longitude: 0,
        latitude: 0
    },
    address: {
        street: "",
        city: "",
        country_code: "",
        zip: "",
    }
}

export default function Register() {
    const {data, setData, post, processing} = useForm(INITIAL_DATA);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [postUrl, setPostUrl] = useState('');

    const handleClose = () => setShowSuccessModal(false);
    const handleShow = () => setShowSuccessModal(true);

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
        <AccountTypeSelection {...data} updateFields={updateFields} setPostUrl={setPostUrl} />,
        <CompanyForm {...data} updateFields={updateFields} />,
        <AddressForm {...data} updateFields={updateFields} address={data.address} />,
        <AccountForm {...data} updateFields={updateFields} />
    ];

    const personalSteps = [
        <AccountTypeSelection {...data} updateFields={updateFields} setPostUrl={setPostUrl} />,
        <PersonalForm {...data} updateFields={updateFields} />,
        <AddressForm {...data} updateFields={updateFields} address={data.address} />,
        <AccountForm {...data} updateFields={updateFields} />,
    ];
    const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } = useMultistepForm(data.is_business_account ? businessSteps : personalSteps );

    let csrfToken = document.querySelector("meta[name='csrf-token']")?.getAttribute("content");

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!isLastStep) return next();
        console.log(data);

        post(postUrl, {
            headers: {
                'X-CSRF-TOKEN': csrfToken ?? ''
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
        <MainLayout>
            <Head title={t("Register")} />
            <PageSection className={"bg-white full-h"}>
                <div className="row m-md-5">
                    <form className={"col-12 col-md-9 mx-auto mt-5 border p-4 shadow"} onSubmit={onSubmit}>
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

                        <div className={"col-12 mx-auto text-end mt-4"}>
                            {!isFirstStep &&
                                <button onClick={back} type="button" className="btn btn-outline-primary">{t("Back")}</button>}

                            {!isFirstStep &&
                                <button type="submit"
                                        className="ms-3 btn btn-primary" disabled={processing}>{isLastStep ? t("Submit") : t("Next")}</button>}
                        </div>
                    </form>
                </div>
            </PageSection>

            <Modal show={showSuccessModal} size={"lg"} centered onHide={handleClose}>
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
        </MainLayout>
    );
}
