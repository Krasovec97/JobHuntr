import {FormWrapper} from "./FormWrapper";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {useEffect, useState} from "react";
import Select from "react-select";
import axios from "axios";
import {usePage} from "@inertiajs/react";
import styled from "styled-components";

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
    const googleApiKey = usePage().props.GOOGLE_MAPS_API;
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
                axios.post(`https://places.googleapis.com/v1/places:searchText`, {"textQuery": addressSearch}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-Api-Key': googleApiKey,
                        'X-Goog-FieldMask': 'places.formattedAddress,places.addressComponents,places.location'
                    }
                })
                    .then((response) => {
                        setAvailableLocations(response.data.places);
                    })
            }, 500)

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
        place.addressComponents.map((component) => {
            switch (component.types[0]) {
                case 'street_number':
                    houseNumber = component.longText
                    break;
                case 'route':
                    streetName = component.longText;
                    break;
                case 'postal_town':
                    updateFields({city: component.longText});
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
            }
        });

        updateFields({street: streetName + " " + houseNumber});
        updateFields({coordinates: place.location});
        setUserConfirmedAddress(true);

        setAvailableLocations([]);
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
                    defaultValue={street}
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
                <label className={"form-label ps-0"}>{t("Zip")} <span className={"text-danger"}>*</span></label>
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
                        defaultValue={selectedCountry}
                        onChange={(selectedOption) => countryChange(selectedOption)}/>
            </div>
        </FormWrapper>
    )
}

let AddressSelection = styled.div`
    border-radius: 7px;
    cursor: pointer;
    transition: all ease-in-out 100ms;
        &:hover {
            background: #d30855;
            color: white;
        }
    `
