import React, {useState} from "react";
import MainLayout from "@/Layouts/MainLayout";
import {Head, useForm} from "@inertiajs/react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import PageSection from "@/Components/PageSection";
import GoogleLocationSelect from "@/Components/GoogleLocationSelect";
import useGlobalContext from "@/Hooks/useGlobalContext";

type FormDataType = {
    email: string,
    place_id: string,
    company_name: string,
    company_number: string,
    company_vat_id: string,
    is_vat_obligated: boolean,
    coordinates: {
        longitude: number,
        latitude: number,
    },
    address: {
        street: string,
        city: string,
        country_code: string,
        zip: string,
    }
}

let INITIAL_DATA:FormDataType = {
    place_id: "",
    email: "",
    company_name: "",
    company_number: "",
    company_vat_id: "",
    is_vat_obligated: false,
    coordinates: {
        longitude: 0,
        latitude: 0
    },
    address: {
        street: "",
        city: "",
        country_code: "",
        zip: "",
    }
}

export default function AddNewCompany() {
    const {t} = useLaravelReactI18n();
    const {data, setData, post, reset} = useForm(INITIAL_DATA);
    const [showCompanyForm, setShowCompanyForm] = useState(false);
    const [errors, setErrors] = useState<string[]|undefined>();
    const globalContext = useGlobalContext();

    function updateFields(fields: Partial<FormDataType>) {
        setData((prevState: any) => {
            return {...prevState, ...fields};
        })
    }

    let toggleVatObligation = () => {
        updateFields({is_vat_obligated: !data.is_vat_obligated})
    }

    let searchForCompany = () => {
        post('/company/preregistration/validate', {
            onError: (errors) => {
                // @ts-ignore
                setErrors(errors);
            },
            onSuccess: () => {
                window.open(`https://www.ajpes.si/prs/rezultati.asp?davcna=${data.company_vat_id}`, '_blank');
                setShowCompanyForm(true);
                setErrors(undefined);
            }
        })
    }

    let handleCompanyPreRegistration = () => {
        post('/company/preregistration', {
            onError: (errors) => {
                // @ts-ignore
                setErrors(errors);
            },
            onSuccess: () => {
                globalContext?.FlashNotification.setText("Company pre-registration successful!");
                globalContext?.FlashNotification.setIsOpen('true');
                globalContext?.FlashNotification.setStyle("success");

                reset();
            }
        })
    }

    return (
        <MainLayout>
            <Head title={"Partner"} />
            <PageSection className={"full-h"}>
                <div className="text-center">
                    <h1 className="fw-bold h3">{t('Add a company')}</h1>

                    {errors &&
                        <div className="alert alert-danger mt-4">
                            {errors.map((error, index) => {
                                return (
                                    <div key={index}>{error}</div>
                                )
                            })}
                        </div>
                    }

                    <div className="col-lg-6 mx-auto mt-5">
                        <input type="text" min={6} className="form-control" onChange={(e) => updateFields({company_vat_id: e.target.value})} placeholder={t('Company VAT ID')}/>
                        <button className="btn btn-primary px-5 mt-3" onClick={() => searchForCompany()}>{t('Search')}</button>
                    </div>

                    {showCompanyForm &&
                        <div className="col-lg-6 mx-auto text-start mt-5">
                            <GoogleLocationSelect address={data.address} updateFields={updateFields} />

                            <div className="mb-3">
                                <label className={"form-label ps-0"}>{t("Company name")} <span className={"text-danger"}>*</span></label>
                                <input
                                    required={true}
                                    className={"form-control"}
                                    type="text"
                                    value={data.company_name}
                                    onChange={e => updateFields({company_name: e.target.value})}/>
                            </div>

                            <div className="mb-3">
                                <label className={"form-label ps-0"}>{t("Company Registration Number")} <span
                                    className={"text-danger"}>*</span></label>
                                <input
                                    required={true}
                                    className={"form-control"}
                                    type="text"
                                    value={data.company_number}
                                    onChange={e => updateFields({company_number: e.target.value})}/>
                            </div>

                            <div className="mb-3">
                                <label className={"form-label ps-0"}>{t("Company VAT ID")} <span
                                    className={"text-danger"}>*</span></label>
                                <input
                                    required={true}
                                    className={"form-control"}
                                    type="text"
                                    value={data.company_vat_id}
                                    onChange={e => updateFields({company_vat_id: e.target.value})}/>
                            </div>

                            <div className="mb-3">
                                <label className={"form-label ps-0"}>{t("Email")} <span
                                    className={"text-danger"}>*</span></label>
                                <input
                                    required={true}
                                    className={"form-control"}
                                    type="text"
                                    value={data.email}
                                    onChange={e => updateFields({email: e.target.value})}/>
                            </div>

                            <div className="mb-3 d-flex align-middle">
                                <input
                                    id={"is_vat_obligated_check"}
                                    className={"form-check-inline"}
                                    type="checkbox"
                                    checked={data.is_vat_obligated}
                                    onChange={toggleVatObligation}/>
                                <label htmlFor={"is_vat_obligated_check"}
                                       className={"form-check-label"}>{t("Is company vat obligated?")} <span
                                    className={"text-danger"}>*</span></label>
                            </div>
                            <div className="text-center mt-5">
                                <button className="btn btn-primary px-5" onClick={() => handleCompanyPreRegistration()}>{t("Save")}</button>
                            </div>
                        </div>
                    }
                </div>
            </PageSection>
        </MainLayout>
);
}
