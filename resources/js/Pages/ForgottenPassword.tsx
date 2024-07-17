import { Head, useForm } from '@inertiajs/react';
import {useLaravelReactI18n} from "laravel-react-i18n";
import React, {useState} from 'react';
import MainLayout from "../Layouts/MainLayout";
import PageSection from "../Components/PageSection";
import FancyTitle from "../Components/FancyTitle";
import InputLabel from "../Components/InputLabel";
import InputError from "../Components/InputError";


export default function ForgottenPassword() {
    const [success, setSuccess] = useState(false);
    const { data, setData, post, errors } = useForm({
        email: ''
    });

    const {t} = useLaravelReactI18n();

    function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        post('/forgotten/password', {
            onSuccess: () => {
                document.querySelector('#submitPasswordReset')?.classList.add('disabled');
                setSuccess(true);
            }
        });
    }

    return (
        <MainLayout>
            <Head title={t("Forgotten password")} />

            <PageSection className={'full-h'}>
                <FancyTitle heading={t("Reset your password").toUpperCase()} subtitle={t('Oopsie')} />
                <div className={"col-12 col-md-5 border p-4 rounded mx-auto shadow"}>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel value="Email"/>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="form-control"
                                autoComplete="off"
                                autoFocus={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2"/>
                        </div>
                        {success &&
                            <div className="fw-semibold text-success text-center my-3">
                                {t("An email was sent to provided address, if an account was found!")}
                            </div>
                        }
                        <div className={"col-12 text-center mt-4"}>
                            <button id="submitPasswordReset" className={"btn btn-primary px-5"}>{t("Submit")}</button>
                        </div>
                    </form>
                </div>
            </PageSection>
        </MainLayout>
    );
}
