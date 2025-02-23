import {FormWrapper} from "./FormWrapper";
import {useLaravelReactI18n} from "laravel-react-i18n";
import React from "react";
import Select from "react-select";

type PersonalDetails = {
    first_name: string,
    last_name: string,
    contact_phone: string,
    gender: string
}

type AddressFormProps = PersonalDetails & {
    updateFields: (fields: Partial<PersonalDetails>) => void
}


export function PersonalForm({ first_name, last_name, contact_phone, updateFields }: AddressFormProps) {
    const {t} = useLaravelReactI18n();
    return (
        <FormWrapper title={t("User Information")} subtitle={t("Tell us a bit about yourself")}>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Gender")} <span className={"text-danger"}>*</span></label>
                <Select
                options={[
                    {
                        value: "male",
                        label: t('Male')
                    },
                    {
                        value: "female",
                        label: t('Female')
                    }
                ]}
                placeholder={`${t("Select")}...`}
                required={true}
                onChange={(selectedOption) => updateFields({gender: selectedOption!.value})}
                />
            </div>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("First Name")} <span className={"text-danger"}>*</span></label>
                <input
                    autoFocus
                    required={true}
                    className={"form-control"}
                    type="text"
                    value={first_name}
                    onChange={e => updateFields({first_name: e.target.value})}/>
            </div>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Last Name")} <span className={"text-danger"}>*</span></label>
                <input
                    required={true}
                    className={"form-control"}
                    type="text"
                    value={last_name}
                    onChange={e => updateFields({last_name: e.target.value})}/>
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
