import React from 'react';
import {usePage} from "@inertiajs/react";
import {UserData} from "@/Interfaces/SharedInterfaces";
import {useLaravelReactI18n} from "laravel-react-i18n";

export default function DashboardContent() {
    const {user} = usePage<{ auth: { user: UserData } }>().props.auth;
    const {t} = useLaravelReactI18n();

    const accountCompletedSteps = [
        {
            description: "You have entered your education in profile settings",
            completed: user.education_id !== null
        },
        {
            description: "You have uploaded your resume",
            completed: user.resume_uploaded
        },
        {
            description: "You have entered your date of birth in profile settings",
            completed: user.date_of_birth !== null
        },
        {
            description: "You have verified your email",
            completed: user.email_verified_at !== null
        }
    ]

    return (
        <div className={'full-h'}>
            <div>
                <p>{t("In order to apply through JobHuntr, you need to complete the following steps:")}</p>
                {accountCompletedSteps.map((step, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="d-none d-xl-block col-xl-auto my-1 pe-0">
                                <div className={`rounded-start-2 px-2 ${step.completed ? 'bg-success' : 'bg-danger'}`}>
                                    <i className={`fa-solid text-white ${step.completed ? 'fa-check' : 'fa-xmark'}`}></i>
                                </div>
                            </div>
                            <div className={`col-xl-auto px-3 my-1 py-2 py-md-0 ${step.completed ? 'bg-success-subtle' : 'bg-danger-subtle'}`}>
                                <div className={`d-xl-none d-block col-2 my-2 px-1 rounded-4 text-center mx-auto ${step.completed ? 'bg-success' : 'bg-danger'}`}>
                                        <i className={`fa-solid align-middle text-white ${step.completed ? 'fa-check' : 'fa-xmark'}`}></i>
                                </div>
                                {t(step.description)}.
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
