import {useLaravelReactI18n} from "laravel-react-i18n";
import BusinessLayout from "../../Layouts/BusinessLayout";
import {Head, useForm} from "@inertiajs/react";
import CompanyQuickView from "../Parts/CompanyQuickView";
import FancyTitle from "../../Components/FancyTitle";
import PageSection from "../../Components/PageSection";
import {useState} from "react";
import useGlobalContext from "../../Hooks/useGlobalContext";
import {CompanyData} from "@/Interfaces/SharedInterfaces";
import React from "react";

interface PageProps {
    company: CompanyData
}

export default function AccountSettings({company}: PageProps) {
    const [isVatObligated, setIsVatObligated] = useState(company.is_vat_obligated);
    const {t} = useLaravelReactI18n();
    const globalContext = useGlobalContext();

    const {setData, post, processing} = useForm({
        contact_person: company.contact_person,
        contact_phone: company.contact_phone,
        is_vat_obligated: isVatObligated,
        city: company.city,
        country_id: company.country_id,
        email: company.email,
        name: company.name,
        id: company.id,
        company_number: company.company_number,
        street: company.street,
        vat_id: company.vat_id,
        zip: company.zip
    });

    let toggleVatObligation = () => {
        setIsVatObligated(!isVatObligated);
        setData(values => ({
            ...values,
            is_vat_obligated: !isVatObligated
        }));
    }

    function submit(e: any) {
        e.preventDefault();
        post('/account', {
            onError: (errors: any|string|string[]) => {
                let errorMessage = '';
                if (typeof errors !== 'string') {
                    errors?.map((error: string) => errorMessage += error + `<br >`)
                }
                globalContext?.FlashNotification.setText(errorMessage);
                globalContext?.FlashNotification.setIsOpen('true');
                globalContext?.FlashNotification.setStyle("danger");
            },
            onSuccess: () => {
                globalContext?.FlashNotification.setText(t("Account updated!"));
                globalContext?.FlashNotification.setIsOpen('true');
                globalContext?.FlashNotification.setStyle("success");
            },
            preserveScroll: true
        });
    }


    return (
        <BusinessLayout>
            <Head title={t("[Business] Account settings")} />

            <PageSection className={'bg-white full-h'}>
                <CompanyQuickView company={company}/>

                <FancyTitle heading={t("Update your account")} subtitle={""} />

                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label className={"form-label ps-0"}>{t("Company name")} <span
                            className={"text-danger"}>*</span></label>
                        <input
                            autoFocus
                            required={true}
                            className={"form-control"}
                            type="text"
                            defaultValue={company.name}
                            disabled/>
                    </div>

                    <div className="mb-3">
                        <label className={"form-label ps-0"}>{t("Company Registration Number")} <span
                            className={"text-danger"}>*</span></label>
                        <input
                            required={true}
                            className={"form-control"}
                            type="text"
                            defaultValue={company.company_number}
                            disabled={true}/>
                    </div>

                    <div className="mb-3">
                        <label className={"form-label ps-0"}>{t("Company VAT ID")} <span
                            className={"text-danger"}>*</span></label>
                        <input
                            required={true}
                            className={"form-control"}
                            type="text"
                            defaultValue={company.vat_id}
                            disabled={true}/>
                    </div>

                    <div className="mb-3">
                        <label className={"form-label ps-0"}>{t("Company street")} <span
                            className={"text-danger"}>*</span></label>
                        <input
                            required={true}
                            className={"form-control"}
                            type="text"
                            defaultValue={company.street}
                            disabled={true}
                            onChange={e => setData('street', e.target.value)}/>
                    </div>

                    <div className="row">
                        <div className="mb-3 col-4">
                            <label className={"form-label ps-0"}>{t("Company zip")} <span
                                className={"text-danger"}>*</span></label>
                            <input
                                required={true}
                                className={"form-control"}
                                type="text"
                                defaultValue={company.zip}
                                disabled={true}
                                onChange={e => setData('zip', e.target.value)}/>
                        </div>

                        <div className="mb-3 col-8">
                            <label className={"form-label ps-0"}>{t("Company city")} <span
                                className={"text-danger"}>*</span></label>
                            <input
                                required={true}
                                className={"form-control"}
                                type="text"
                                defaultValue={company.city}
                                disabled={true}
                                onChange={e => setData('city', e.target.value)}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="my-3 text-center">
                        {t("In case you want to change any of the information above, please email us at info@jobhuntr.co")}
                    </div>
                    <hr/>
                    <div className="mb-3 d-flex align-middle">
                        <input
                            id={"is_vat_obligated_check"}
                            className={"form-check-inline"}
                            type="checkbox"
                            defaultChecked={isVatObligated}
                            onChange={toggleVatObligation}/>
                        <label htmlFor={"is_vat_obligated_check"}
                               className={"form-check-label"}>{t("Is company vat obligated?")} <span
                            className={"text-danger"}>*</span></label>
                    </div>

                    <div className="mb-3">
                        <label className={"form-label ps-0"}>{t("Contact Person")} <span
                            className={"text-danger"}>*</span></label>
                        <input
                            required={true}
                            className={"form-control"}
                            type="text"
                            defaultValue={company.contact_person}
                            onChange={e => setData('contact_person', e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label className={"form-label ps-0"}>{t("Company Email")} <span
                            className={"text-danger"}>*</span></label>
                        <input
                            required={true}
                            className={"form-control"}
                            type="text"
                            defaultValue={company.email}
                            onChange={e => setData('email', e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label className={"form-label ps-0"}>{t("Contact Phone")} <span
                            className={"text-danger"}>*</span></label>
                        <input
                            required={true}
                            className={"form-control"}
                            type="text"
                            defaultValue={company.contact_phone}
                            placeholder={"+441172345678"}
                            aria-describedby="phoneHelp"
                            pattern={"^\\+\\d.*"}
                            onChange={e => setData('contact_phone', e.target.value)}/>
                        <small id="phoneHelp" className="form-text text-muted">
                            {t("Please include country code for your telephone number (Start with +). Your telephone number also shouldn't contain any spaces.")}
                        </small>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 text-end">
                            <button disabled={processing} className={"btn btn-primary px-4"}>{t("Update")}</button>
                        </div>
                    </div>
                </form>
            </PageSection>
        </BusinessLayout>
    );
}
