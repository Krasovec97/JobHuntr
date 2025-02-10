import MainLayout from "@/Layouts/MainLayout";
import PageSection from "@/Components/PageSection";
import React from "react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {TableRow} from "@/Pages/Business/Jobs";
import {DateTime} from "luxon";

interface UserCompany {
    city: string,
    company_number: string,
    created_at: string,
    email: string,
    is_vat_obligated: true,
    name: string,
    registration_completed_at: string|null,
    street: string,
    updated_at: string,
    vat_id: string,
    zip: string,
    notes: string
}

interface Props {
    userCompanies: UserCompany[]
}

export default function ListCompanies({userCompanies}: Props) {
    const {t} = useLaravelReactI18n();
    return (
        <MainLayout>
            <PageSection className={'full-h'}>
                <div className="row mb-4">
                    <h1 className="h2 fw-bold">{t('Companies added by you')}:</h1>
                    <small>{t('You have added a total of :count companies', {count: userCompanies.length})}</small>
                </div>

                <div className={"row bg-primary text-white py-3 overflow-scroll"}>
                    <div className="col-4 col-xl-3 fw-bold">{t("Company name")}</div>
                    <div className="d-none d-xl-block col-xl-2 fw-bold">{t("Company VAT ID")}</div>
                    <div className="d-none d-xl-block col-xl-3 fw-bold">{t("Street")}</div>
                    <div className="col-4 col-xl-2 fw-bold">{t("Registration completed")}</div>
                    <div className="col-4 col-xl-2 fw-bold">{t("Registered on")}</div>
                </div>

                {userCompanies.map((company) => {
                    return (
                        <TableRow title={company.notes} className={"row py-3 text-decoration-none text-dark border-bottom border-dark border-opacity-25 overflow-x-scroll"}>
                            <div className="col-4 col-xl-3">{company.name}</div>
                            <div className="d-none d-xl-block col-xl-2">{company.vat_id}</div>
                            <div className="d-none d-xl-block col-xl-3">{company.street}</div>
                            <div className="col-4 col-xl-2">{company.registration_completed_at !== null ? t('Yes') : t('No')}</div>
                            <div className="col-4 col-xl-2">{DateTime.fromISO(company.created_at).toFormat("dd.MM.yyyy")}</div>
                        </TableRow>
                    )
                })}
            </PageSection>
        </MainLayout>
    )
}
