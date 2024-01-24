import GuestLayout from '../../Layouts/GuestLayout.js';
import { Head, Link, useForm } from '@inertiajs/react';
import PageSection from "../Parts/PageSection";
import {useMultistepForm} from "../../Hooks/useMultistepForm";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {UserForm} from "../Parts/FormParts/UserForm";
import {AccountForm} from "../Parts/FormParts/AccountForm";
import {AddressForm} from "../Parts/FormParts/AddressForm";
import {FormEvent, useState} from "react";

type FormDataType = {
    firstName: string,
    lastName: string,
    age: string,
    street: string,
    city: string,
    state: string,
    zip: string,
    email: string,
    password: string
}

const INITIAL_DATA:FormDataType = {
    firstName: "",
    lastName: "",
    age: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    password: ""
}
export default function Register() {
    const [data, setData] = useState(INITIAL_DATA);
    function updateFields(fields: Partial<FormDataType>) {
        setData(prevState => {
            return {...prevState, ...fields};
        })
    }

    const {t} = useLaravelReactI18n();
    const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } = useMultistepForm([
        <UserForm {...data} updateFields={updateFields} />,
        <AddressForm {...data} updateFields={updateFields} />,
        <AccountForm {...data} updateFields={updateFields} />
    ]);

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!isLastStep) return next();
        alert("Success!");
    }

    return (
        <GuestLayout>
            <Head title="Register" />

            <PageSection className={"bg-white full-h"}>
                <div className="border border-dark p-3 rounded">
                    <form onSubmit={onSubmit}>
                        <div className="col-12 text-center">
                            {currentStepIndex + 1} / {steps.length}
                        </div>

                        {step}

                        <div>
                            {!isFirstStep &&
                                <button onClick={back} type="button" className="btn btn-sm btn-outline-primary">{t("Back")}</button>}

                            <button type="submit" className="btn btn-sm btn-primary">
                                {isLastStep ? t("Submit") : t("Next")}
                            </button>
                        </div>
                    </form>
                </div>
            </PageSection>
        </GuestLayout>
    );
}
