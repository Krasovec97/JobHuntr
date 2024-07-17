import {useLaravelReactI18n} from "laravel-react-i18n";
import ApplicationLogo from "../../Components/ApplicationLogo";
import React from "react";

export default function () {
    const {t} = useLaravelReactI18n();
    return (
        <>
            <footer className="bg-dark py-3 text-center">
                <div>
                    <ApplicationLogo/>
                </div>
                <div className="mt-3">
                    <i className="fa-solid fa-at"></i> <a href="mailto:info@jobhuntr.co" className="fw-bold">info@jobhuntr.co</a>
                </div>
                <div className="mt-3">
                    {t("© 2024 JobHuntr | All rights reserved")}
                </div>
                <div>
                    <a className="mx-2" href={`/policies/tos_${navigator.language}.pdf`} target={"_blank"}>
                        <small>{t("Terms of use")}</small>
                    </a>

                    <a className="mx-2" href={`/policies/gdpr_${navigator.language}.pdf`} target={"_blank"}>
                        <small>{t("GDPR Policy")}</small>
                    </a>
                    <a className="mx-2" href={`/policies/privacy_policy_${navigator.language}.pdf`} target={"_blank"}>
                        <small>{t("Privacy policy")}</small>
                    </a>
                    <a className="mx-2" href={`/policies/cookie_policy_${navigator.language}.pdf`} target={"_blank"}>
                        <small>{t("Cookie policy")}</small>
                    </a>
                </div>
            </footer>
        </>
    );
}
