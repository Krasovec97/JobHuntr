import {FormWrapper} from "./FormWrapper";
import {useLaravelReactI18n} from "laravel-react-i18n";
import React from "react";
import {useState} from "react";

type CompanyData = {
    company_name: string,
    company_number: string,
    company_vat_id: string,
    is_vat_obligated: boolean,
    contact_person: string,
    contact_phone: string,
}

type CompanyFormProps = CompanyData & {
    updateFields: (fields: Partial<CompanyData>) => void
}

export function CompanyForm({ company_name, company_number, company_vat_id, is_vat_obligated, contact_person, contact_phone, updateFields }: CompanyFormProps) {
    const [isVatObligated, setIsVatObligated] = useState(is_vat_obligated);
    const {t} = useLaravelReactI18n();

    let toggleVatObligation = () => {
        setIsVatObligated(!isVatObligated);
        updateFields({is_vat_obligated: !isVatObligated})
    }

    return (
        <FormWrapper title={t("Company Details")} subtitle={t("Let's dive in")}>
            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Company name")} <span
                    className={"text-danger"}>*</span></label>
                <input
                    autoFocus
                    required={true}
                    className={"form-control"}
                    type="text"
                    value={company_name}
                    onChange={e => updateFields({company_name: e.target.value})}/>
            </div>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Company Registration Number")} <span
                    className={"text-danger"}>*</span></label>
                <input
                    required={true}
                    className={"form-control"}
                    type="text"
                    value={company_number}
                    onChange={e => updateFields({company_number: e.target.value})}/>
            </div>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Company VAT ID")} <span
                    className={"text-danger"}>*</span></label>
                <input
                    required={true}
                    className={"form-control"}
                    type="text"
                    value={company_vat_id}
                    onChange={e => updateFields({company_vat_id: e.target.value})}/>
            </div>

            <div className="mb-3 d-flex align-middle">
                <input
                    id={"is_vat_obligated_check"}
                    className={"form-check-inline"}
                    type="checkbox"
                    checked={isVatObligated}
                    onChange={toggleVatObligation}/>
                <label htmlFor={"is_vat_obligated_check"}
                       className={"form-check-label"}>{t("Is company vat obligated?")} <span
                    className={"text-danger"}>*</span></label>
            </div>
            <hr/>
            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Contact Person")} <span
                    className={"text-danger"}>*</span></label>
                <input
                    required={true}
                    className={"form-control"}
                    type="text"
                    value={contact_person}
                    onChange={e => updateFields({contact_person: e.target.value})}/>
            </div>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Contact Phone")} <span
                    className={"text-danger"}>*</span></label>
                <input
                    required={true}
                    className={"form-control"}
                    type="text"
                    value={contact_phone}
                    placeholder={"+441172345678"}
                    aria-describedby="phoneHelp"
                    pattern={"^\\+\\d.*"}
                    onChange={e => updateFields({contact_phone: e.target.value})}/>
                <small id="phoneHelp" className="form-text text-muted">
                    {t("Please include country code for your telephone number (Start with +). Your telephone number also shouldn't contain any spaces.")}
                </small>
            </div>
        </FormWrapper>
    )
}
