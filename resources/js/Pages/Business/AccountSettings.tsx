import {useLaravelReactI18n} from "laravel-react-i18n";
import BusinessLayout from "../../Layouts/BusinessLayout";
import {Head, useForm} from "@inertiajs/react";
import CompanyQuickView from "../Parts/CompanyQuickView";
import FancyTitle from "../../Components/FancyTitle";
import PageSection from "../Parts/PageSection";
import {useState} from "react";
import useGlobalContext from "../../Hooks/useGlobalContext";
import {CompanyData} from "../../Interfaces/SharedInterfaces";

export default function AccountSettings({company}: CompanyData) {
    const [isVatObligated, setIsVatObligated] = useState(company.is_vat_obligated);
    const {t} = useLaravelReactI18n();
    let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const globalContext = useGlobalContext();

    const {data, setData, post, processing} = useForm({
        contact_person: company.contact_person,
        contact_phone: company.contact_phone,
        is_vat_obligated: isVatObligated,
        city: company.city,
        country: company.country,
        email: company.email,
        full_name: company.full_name,
        id: company.id,
        registration_house: company.registration_house,
        company_number: company.company_number,
        short_name: company.short_name,
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

    function submit(e) {
        e.preventDefault();
        post('/account', {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
            onError: (errors: string) => {
                let errorMessage = '';
                errors.map((error) => errorMessage += error + `<br >`)
                globalContext.FlashNotification.setText(errorMessage);
                globalContext.FlashNotification.setIsOpen('true');
                globalContext.FlashNotification.setStyle("danger");
            },
            onSuccess: () => {
                globalContext.FlashNotification.setText(t("Account updated!"));
                globalContext.FlashNotification.setIsOpen('true');
                globalContext.FlashNotification.setStyle("success");
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
                        <label className={"form-label ps-0"}>{t("Company Full Name")} <span
                            className={"text-danger"}>*</span></label>
                        <input
                            autoFocus
                            required={true}
                            className={"form-control"}
                            type="text"
                            defaultValue={company.full_name}
                            disabled/>
                    </div>

                    <div className="mb-3">
                        <label className={"form-label ps-0"}>{t("Company Short Name")} <span
                            className={"text-danger"}>*</span></label>
                        <input
                            required={true}
                            className={"form-control"}
                            type="text"
                            defaultValue={company.short_name}
                            onChange={e => setData('short_name', e.target.value)}
                            disabled={true}/>
                    </div>

                    <div className="mb-3">
                        <label className={"form-label ps-0"}>{t("Company Registration House")} <span
                            className={"text-danger"}>*</span></label>
                        <input
                            aria-describedby={"companyHouseExplanation"}
                            required={true}
                            className={"form-control"}
                            type="text"
                            defaultValue={company.registration_house}
                            disabled/>
                        <div id={"companyHouseExplanation"} className={"form-text fst-italic"}>
                            {t("Entity at which the company was registered (Company House for UK, Ajpes for Slovenia, etc.).")}
                        </div>
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
