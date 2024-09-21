import {FormWrapper} from "./FormWrapper";
import {useLaravelReactI18n} from "laravel-react-i18n";
import React from "react";
import GoogleLocationSelect from "../../../Components/GoogleLocationSelect";

type AddressData = {
    address: {
        street: string,
        city: string,
        country: string,
        zip: string,
    }
    coordinates: {
        longitude: number,
        latitude: number
    }
}

type AddressFormProps = AddressData & {
    updateFields: (fields: Partial<AddressData>) => void
}


export function AddressForm({ updateFields, address }: AddressFormProps) {
    const {t} = useLaravelReactI18n();
    return (
        <FormWrapper title={t("Address information")} subtitle={t("Where are you located?")}>
            <GoogleLocationSelect updateFields={updateFields} address={address} />
        </FormWrapper>
    )
}
