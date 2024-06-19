import {useLaravelReactI18n} from "laravel-react-i18n";
import React from "react";
import {CompanyData} from "../../Interfaces/SharedInterfaces";

interface PageProps {
    company: CompanyData
}

export default function ({company}: PageProps) {
    const {t} = useLaravelReactI18n()
    return (
        <div className="row border-bottom border-dark border-opacity-10 pb-3">
            <div className="col-12">{company.full_name}</div>
        </div>
    )
}
