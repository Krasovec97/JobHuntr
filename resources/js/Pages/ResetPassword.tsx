import { Head, useForm } from '@inertiajs/react';
import {useLaravelReactI18n} from "laravel-react-i18n";
import React, {useEffect, useState} from 'react';
import MainLayout from "../Layouts/MainLayout";
import PageSection from "../Components/PageSection";
import FancyTitle from "../Components/FancyTitle";
import {validatePasswords} from "@/Helpers";

interface ResetPasswordProps {
    linkExpired?: string,
    entity_id: number,
    entity_type: string,
    errors: string[]
}

export default function ResetPassword({linkExpired, entity_id, entity_type, errors}: ResetPasswordProps) {
    const {t} = useLaravelReactI18n();
    const [passwordInput, setPasswordInput] = useState<string|undefined>();
    const [confirmPassword, setConfirmPassword] = useState<string|undefined>();
    const [responseSuccess, setResponseSuccess] = useState<boolean>(false);
    const [clientErrors, setClientErrors] = useState<string[]>(errors);

    const {setData, post } = useForm({
        entity_type: entity_type,
        entity_id: entity_id,
        password: ''
    });

    useEffect(() => {
        if (passwordInput) {
            const validationErrors = validatePasswords(passwordInput, confirmPassword, t);
            setClientErrors(validationErrors);

            if (validationErrors.length === 0) {
                setData(values => ({
                    ...values,
                    password: confirmPassword!
                }))
            }
        }
    }, [passwordInput, confirmPassword, t]);

    function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        post('/password/reset/', {
            onSuccess: () => {
                setTimeout(() => window.location.href = '/login', 3000);
                setResponseSuccess(true);
            }
        });
    }

    const handleCPassword = (e: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setConfirmPassword(e.target.value);
    }

    return (
        <MainLayout>
            <Head title={t("Forgotten password")} />

            <PageSection className={'full-h'}>
                <FancyTitle heading={t("Choose a new password").toUpperCase()} subtitle={t("Let's get you back on track")} />
                {linkExpired !== null ?
                    <div className={"col-12 col-md-5 border p-4 rounded mx-auto shadow text-center text-danger"}>
                        <div className={'fw-semibold'}>{linkExpired}</div>

                        <a className="btn btn-primary mt-4 fw-semibold" href="/login">
                            {t("Back to login")}
                        </a>
                    </div>
                    :
                    <div className={"col-12 col-md-5 border p-4 rounded mx-auto shadow"}>
                        {!responseSuccess ?
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <label>{t("Password")}</label>
                                    <input
                                        required
                                        className={"form-control"}
                                        autoComplete="new-password"
                                        type="password"
                                        value={passwordInput}
                                        aria-describedby={"passwordHelp"}
                                        pattern={"^(?=.*[!@#$%^&*:;_/])(?=.*[a-zA-Z0-9]).{8,}$"}
                                        onChange={e => setPasswordInput(e.target.value)}/>
                                    <small id="passwordHelp" className="form-text text-muted">
                                        {t("To make your account secure, your password must have a minimum of 8 characters and it must include a symbol.")}
                                    </small>
                                </div>

                                <div className="mb-3">
                                    <label>{t("Repeat password")}</label>
                                    <input
                                        required
                                        className={"form-control"}
                                        autoComplete="new-password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={handleCPassword}/>
                                </div>

                                {clientErrors.length > 0 &&
                                    <div className={"text-danger"}>
                                        {clientErrors.map((error, index) => <div key={index}>{error}</div>)}
                                    </div>
                                }

                                <div className={"col-12 text-center mt-4"}>
                                    <button id="submitPasswordReset"
                                            className={"btn btn-primary px-5"}>{t("Submit")}</button>
                                </div>
                            </form>
                            :
                            <>
                                <div className={'text-success text-center fw-bold'}>
                                    {t("Your password was successfully reset, you can now login to your account")}
                                </div>

                                <div className="row justify-content-center mt-4">
                                    <a href='/login' className={"btn btn-primary px-5"}>{t("Back to login")}</a>
                                </div>
                            </>
                        }
                    </div>
                }
            </PageSection>
        </MainLayout>
    );
}
