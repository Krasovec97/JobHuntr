import {FormWrapper} from "./FormWrapper";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {useEffect, useState} from "react";
import Select from "react-select";
import axios from "axios";
import {AddressSelection} from "../../../Styles/SharedStyles";

type AddressData = {
    street: string,
    city: string,
    country: string,
    zip: string,
    coordinates: {
        longitude: number,
        latitude: number
    }
}

type AddressFormProps = AddressData & {
    updateFields: (fields: Partial<AddressData>) => void
}


export function AddressForm({ street, city, country, zip, updateFields }: AddressFormProps) {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [addressSearch, setAddressSearch] = useState('');
    const [availableLocations, setAvailableLocations] = useState([]);
    const [userConfirmedAddress, setUserConfirmedAddress] = useState(false);


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

    useEffect(() => {
        if (!userConfirmedAddress && addressSearch !== '') {
            const delayDebounceFn = setTimeout(() => {
                axios.get(`/google/places?searchString=${btoa(addressSearch.toUpperCase())}`)
                    .then((response) => {
                        if (Object.keys(response.data).length > 0) {
                            setAvailableLocations(response.data.places);
                        } else {
                            setAvailableLocations([]);
                        }
                    })
            }, 650)

            return () => clearTimeout(delayDebounceFn)
        }
    }, [addressSearch]);

    let countryChange = (selectedOption) => {
        updateFields({country: selectedOption.label})
        setSelectedCountry(selectedOption)
    }

    let updateAddressInput = (string) => {
        updateFields({street: string});
        setAddressSearch(string);
    }

    let parseAndSetAddress = (place) => {
        let houseNumber = null;
        let streetName = null;
        let city = null;

        place.addressComponents.forEach((component) => {
            switch (component.types[0]) {
                case 'street_number':
                    houseNumber = component.longText
                    break;
                case 'route':
                    streetName = component.longText;
                    break;
                case 'postal_town':
                    updateFields({city: component.longText});
                    city = component.longText;
                    break;
                case 'country':
                    countries.forEach((country) => {
                        if (country.value === component.shortText) {
                            countryChange(country);
                        } else {
                            countryChange({label: component.longText});
                        }
                    })
                    break;
                case 'postal_code':
                    updateFields({zip: component.longText});
                    break;
                case 'administrative_area_level_1':
                    if (city === null) {
                        updateFields({city: component.longText});
                    }
                    break;
            }
        });

        updateFields({street: streetName + " " + houseNumber});
        updateFields({coordinates: place.location});

        setUserConfirmedAddress(true);
        setAvailableLocations([]);
        setAddressSearch(streetName + " " + houseNumber);
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
                    value={addressSearch}
                    // onChange={e => updateFields({street: e.target.value})}
                    onChange={e => updateAddressInput(e.target.value)}
                />

                    <div className="border rounded p-2 mt-2" hidden={availableLocations.length === 0}>
                        {availableLocations.length > 0 && !userConfirmedAddress && availableLocations.map((place, index) => {
                            return (
                                <AddressSelection key={index} onClick={() => parseAndSetAddress(place)} className="p-2">
                                    {place.formattedAddress}
                                </AddressSelection>
                            )
                        })}
                    </div>
            </div>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Postal Code")} <span className={"text-danger"}>*</span></label>
                <input
                    required={true}
                    className={"form-control"}
                    type="text"
                    defaultValue={zip}
                    onChange={e => updateFields({zip: e.target.value})}/>
            </div>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("City")} <span className={"text-danger"}>*</span></label>
                <input
                    required={true}
                    className={"form-control"}
                    type="text"
                    defaultValue={city}
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
