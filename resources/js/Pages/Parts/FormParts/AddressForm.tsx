import {FormWrapper} from "./FormWrapper";
import {useLaravelReactI18n} from "laravel-react-i18n";
import React from "react";
import GoogleLocationSelect from "@/Components/GoogleLocationSelect";

type AddressData = {
    address: {
        street: string,
        city: string,
        country_code: string,
        zip: string,
    }
    coordinates: {
        longitude: number,
        latitude: number
    }
}

type AddressFormProps = AddressData & {
    updateFields: (fields: Partial<AddressData>) => void,
    setNextButtonDisabled: (disabled: boolean) => void,
}


export function AddressForm({ updateFields, address, setNextButtonDisabled }: AddressFormProps) {
    const {t} = useLaravelReactI18n();
    return (
        <FormWrapper title={t("Address information")} subtitle={t("Where are you located?")}>
            <GoogleLocationSelect updateFields={updateFields} address={address} setNextButtonDisabled={setNextButtonDisabled}/>
        </FormWrapper>
    )
}
