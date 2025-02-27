import React from "react";
import {CompanyData} from "@/Interfaces/SharedInterfaces";
import {useLaravelReactI18n} from "laravel-react-i18n";

interface PageProps {
    company: CompanyData
}

export default function CompanyQuickView({company}: PageProps) {
    const {t} = useLaravelReactI18n();
    const companyVerified = company.company_verified_at !== null;

    return (
        <div className="row border-bottom border-dark border-opacity-10 align-middle">
            <div className="col-12 text-center">
                {!companyVerified &&
                    <div className="alert alert-danger">
                        {t('Your company is still being verified. We usually verify your company within 24 hours of registering.')}
                    </div>
                }
            </div>
            <div className="col-12">
                <p className="fw-bold m-0" style={{padding: "10px"}}>
                    {t("Hello") + ", " + company.name}
                    <span className="ms-1" title={t('Your company is verified!')}>
                        <i className="fa-solid fa-circle-check text-success"></i>
                    </span>
                </p>
            </div>
        </div>
    )
}
