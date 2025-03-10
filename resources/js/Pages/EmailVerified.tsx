import {useLaravelReactI18n} from "laravel-react-i18n";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import {usePage} from "@inertiajs/react";


export default function EmailVerified() {
    const {t} = useLaravelReactI18n();

    return (
        <MainLayout>
            <div className="vh-fill text-center">
                <div className="mt-3">
                    <h1 className="fw-bold">{t("Your email has been verified!")}</h1>
                    <p>{t("You may now login and start using everything JobHuntr has to offer")}</p>
                </div>

                <div>
                    <div className="row justify-content-center">
                        <div className="col-6 text-end">
                            <a className="btn btn-primary" href={`https://${usePage().props.business_url}/dashboard`}>{ t("Company login") }</a>
                        </div>
                        <div className="col-6 text-start">
                            <a className="btn btn-outline-primary" href={'/login'}>{ t("Login") }</a>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
