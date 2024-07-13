import {useLaravelReactI18n} from "laravel-react-i18n";
import React from "react";
import MainLayout from "../Layouts/MainLayout";


export default function EmailVerified() {
    const {t} = useLaravelReactI18n();

    return (
        <MainLayout>
            <div className="vh-fill text-center">
                <div className="mt-3">
                    <h1 className="fw-bold">{t("Your email has been verified!")}</h1>
                    <p>{t("You may now login and start using everything JobHuntr has to offer")}</p>
                </div>
            </div>
        </MainLayout>
    )
}
