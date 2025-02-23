import React from "react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {usePage} from "@inertiajs/react";
import {UserData} from "@/Interfaces/SharedInterfaces";

interface ComponentProps {
    handleApplyClick: () => void;
}

export default function ApplyButton({handleApplyClick}: ComponentProps) {
    const {t} = useLaravelReactI18n();
    const {user} = usePage<{auth: {user: UserData|null}}>().props.auth;

    if (!user) {
        return (
            <div className="mb-3 text-center">
                <div>{t("Hey there!")}</div>
                <div>
                    <a href="/register" className="me-1 fw-semibold">{t("Create your account now")}</a>
                    {t("to streamline your job application and employment process!")}
                </div>
            </div>
        )
    }

    if (user && !user.can_apply) {
        return (
            <div className="text-end">
                <button className="btn btn-primary" disabled>{t("Apply now")}</button>
                <div className="mt-2">
                    <div>
                        <small>{t("Please complete all required steps before applying for jobs")}.</small>
                    </div>
                    <div>
                        <small>{t("All steps can be found on your")} <a href="/dashboard" className="fw-semibold" target={"_blank"}>{t("profile page")}</a>.</small>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="text-end">
                <button className="btn btn-primary" onClick={() => handleApplyClick()}>{t("Apply now")}</button>
            </div>
        </>
    )
}
