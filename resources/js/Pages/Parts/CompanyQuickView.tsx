import React from "react";
import {CompanyData} from "../../Interfaces/SharedInterfaces";
import styled from "styled-components";
import {useLaravelReactI18n} from "laravel-react-i18n";

interface PageProps {
    company: CompanyData
}

export default function ({company}: PageProps) {
    const {t} = useLaravelReactI18n();

    return (
        <div className="row border-bottom border-dark border-opacity-10 align-middle">
            <div className="col-6">
                <p className="fw-bold" style={{padding: "10px"}}>{t("Hello") + ", " + company.full_name}</p>
            </div>
            <div className="col-6 text-end">
                <CompanyVerifiedPill
                    title={company.company_verified_at !== null ? t('Your company is verified!') : t('Your company is still being verified. We usually verify your company within 24 hours of registering.')}
                    verified={company.company_verified_at !== null}>
                    {company.company_verified_at !== null ? t('Verified') : t('Unverified')}
                </CompanyVerifiedPill>
            </div>
        </div>
    )
}

let CompanyVerifiedPill = styled.div<{ verified: boolean }>`
    padding: 10px;
    font-weight: bold;
    width: fit-content;
    border-radius: 10px;
    margin-left: auto;
    background-color: ${props => (props.verified ? "#d0f0c0" : "#e8c2c6")};
    color: ${props => (props.verified ? '#4CBB17' : '#dc3545')};
`
