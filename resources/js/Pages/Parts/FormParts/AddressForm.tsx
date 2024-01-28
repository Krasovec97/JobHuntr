import {FormWrapper} from "./FormWrapper";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {useEffect, useState} from "react";
import Select from "react-select";

type AddressData = {
    street: string,
    city: string,
    country: string,
    zip: string,
}

type AddressFormProps = AddressData & {
    updateFields: (fields: Partial<AddressData>) => void
}


export function AddressForm({ street, city, country, zip, updateFields }: AddressFormProps) {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});

    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=false&value=code"
        )
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.countries);
                setSelectedCountry(data.userSelectValue);
                updateFields({country: data.userSelectValue.label})
            });
    }, []);

    let countryChange = (selectedOption) => {
        updateFields({country: selectedOption.label})
        setSelectedCountry(selectedOption)
    }

    const {t} = useLaravelReactI18n();
    return (
        <FormWrapper title={t("Address information")} subtitle={t("Where are you located?")}>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Street")} <span className={"text-danger"}>*</span></label>
                <input
                    autoFocus
                    required={true}
                    className={"form-control"}
                    type="text"
                    value={street}
                    onChange={e => updateFields({street: e.target.value})}/>
            </div>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Zip")} <span className={"text-danger"}>*</span></label>
                <input
                    required={true}
                    className={"form-control"}
                    type="text"
                    value={zip}
                    onChange={e => updateFields({zip: e.target.value})}/>
            </div>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("City")} <span className={"text-danger"}>*</span></label>
                <input
                    required={true}
                    className={"form-control"}
                    type="text"
                    value={city}
                    onChange={e => updateFields({city: e.target.value})}/>
            </div>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Country")} <span className={"text-danger"}>*</span></label>
                <Select options={countries}
                        value={selectedCountry}
                        onChange={(selectedOption) => countryChange(selectedOption)}/>
            </div>
        </FormWrapper>
    )
}
