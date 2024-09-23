import Select from "react-select";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {AddressComponent, Country, PlacePredictionInterface} from "@/Interfaces/SharedInterfaces";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {makeId} from "@/Helpers";

interface ComponentProps {
    updateFields: Function,
    address: {
        street: string,
        city: string,
        zip: string,
        country: string,
    }
}

interface LocationProps {
    label: string,
    value: string,
}

interface AddressProps {
    street: string,
    zip: string,
    city: string,
    country: string,
}

export default function GoogleLocationSelect({updateFields, address}: ComponentProps) {
    const {t} = useLaravelReactI18n();
    const [availableLocations, setAvailableLocations] = useState<Array<LocationProps>>([{
        label: '',
        value: ''
    }]);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [selectedLocation, setSelectedLocation] = useState<LocationProps>({
        label: address.street ?? '',
        value: ''
    });
    const [selectedAddress, setSelectedAddress] = useState<AddressProps>({
        street: address.street ?? '',
        zip: address.zip ?? '',
        city: address.city ?? '',
        country: address.country ?? '',
    });
    const [addressSearch, setAddressSearch] = useState<string>("");
    const [noOptionsString, setNoOptionsString] = useState<string>(t("No options"));
    const sessionId = useRef<string>(makeId(8));

    useEffect(() => {
        fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=false&value=code")
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.countries);
                setSelectedCountry(data.userSelectValue);
                updateFields({country: data.userSelectValue.label})
            });
    }, []);

    const getLocationRecommendations = (value: string) => {
        if (value !== '') {
            let pattern = new RegExp(/\d/);
            if (!pattern.test(value)) value = value + ' 1';

            axios.post(`https://places.googleapis.com/v1/places:autocomplete?key=AIzaSyAXq5JaClCPlEky2fnD5Icy9WKeuYAmF4U&sessionToken=${sessionId.current}`, {
                "input": value,
            }).then((response) => {
                setAvailableLocations(response.data.suggestions.map((place: PlacePredictionInterface) => {
                    return {
                        value: place.placePrediction.placeId,
                        label: place.placePrediction.text.text
                    }
                }));
            }).catch(() => setNoOptionsString(t("No options")));
        }
    }

    useEffect(() => {
        setNoOptionsString(t('Searching') + '...');

        const delay = setTimeout(() => {
            getLocationRecommendations(addressSearch);
        }, 500);

        return () => clearTimeout(delay);
    }, [addressSearch]);


    const setLocation = (place: LocationProps) => {
        setSelectedLocation(place);
        updateFields({location_id: place.value});

        axios.get(`https://places.googleapis.com/v1/places/${place.value}?fields=addressComponents,location&key=AIzaSyAXq5JaClCPlEky2fnD5Icy9WKeuYAmF4U`)
            .then((response) => {
                let newSelectedAddress = {...selectedAddress};

                response.data.addressComponents.forEach((component: AddressComponent) => {
                    switch (component.types[0]) {
                        case 'postal_town':
                            newSelectedAddress.city = component.longText;
                            break;
                        case 'country':
                            countries.forEach((country: Country) => {
                                if (country.value.toUpperCase() === component.shortText.toUpperCase()) {
                                    countryChange(country);
                                    setSelectedCountry(country);
                                    newSelectedAddress.country = country.label;
                                } else {
                                    countryChange({label: component.longText});
                                    setSelectedCountry({value: component.shortText, label: component.longText});
                                    newSelectedAddress.country = component.longText;
                                }
                            })
                            break;
                        case 'postal_code':
                            newSelectedAddress.zip = component.longText;

                            break;
                        case 'administrative_area_level_1':
                            if (newSelectedAddress.city === '') {
                                newSelectedAddress.city = component.longText;
                            }
                            break;
                    }
                });

                newSelectedAddress.street = place.label;

                updateFields({
                    coordinates: response.data.location,
                    address: {...newSelectedAddress}
                });

                setSelectedAddress({...newSelectedAddress});
            });

    };

    let countryChange = (selectedOption: any) => {
        updateFields({country: selectedOption.label})
        setSelectedCountry(selectedOption)
    }

    return (
        <>
            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Street")} <span className={"text-danger"}>*</span></label>
                <Select options={availableLocations}
                        onChange={(value) => value && setLocation(value)}
                        value={selectedLocation}
                        placeholder={t("Start typing and choose your location")}
                        noOptionsMessage={() => noOptionsString}
                        onInputChange={e => setAddressSearch(e)}
                />
            </div>
            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Postal Code")} <span className={"text-danger"}>*</span></label>
                <input
                    required={true}
                    className={"form-control"}
                    type="text"
                    value={selectedAddress.zip}
                    onChange={e => {
                        setSelectedAddress({
                            ...selectedAddress,
                            zip: e.target.value
                        })
                        updateFields({
                            address: {
                                ...selectedAddress,
                                zip: e.target.value
                            }
                        })
                    }}/>
            </div>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("City")} <span
                    className={"text-danger"}>*</span></label>
                <input
                    required={true}
                    className={"form-control"}
                    type="text"
                    value={selectedAddress.city}
                    onChange={e => {
                        setSelectedAddress({
                            ...selectedAddress,
                            city: e.target.value
                        })
                        updateFields({
                            address: {
                                ...selectedAddress,
                                city: e.target.value
                            }
                        })
                    }}/>
            </div>

            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Country")} <span
                    className={"text-danger"}>*</span></label>
                <Select options={countries}
                        value={selectedCountry}
                        onChange={(selectedOption) => countryChange(selectedOption)}/>
            </div>
        </>
    )
}
