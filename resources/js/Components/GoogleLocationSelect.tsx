import Select from "react-select";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {AddressComponent, Country, PlacePredictionInterface} from "@/Interfaces/SharedInterfaces";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {makeId, regions} from "@/Helpers";

interface AddressProps {
    street: string,
    zip: string,
    city: string,
    country_code: string,
    region?: string,
}

interface ComponentProps {
    updateFields: Function,
    address: AddressProps,
    setNextButtonDisabled?: Function,
    showRegionSelect?: boolean
}

interface LocationProps {
    label: string,
    value: string,
}

export default function GoogleLocationSelect({updateFields, address, setNextButtonDisabled, showRegionSelect = false}: ComponentProps) {
    const {t} = useLaravelReactI18n();
    const [availableLocations, setAvailableLocations] = useState<Array<LocationProps>>([{
        label: '',
        value: ''
    }]);
    const [countries, setCountries] = useState<any[]>([]);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [selectedLocation, setSelectedLocation] = useState<LocationProps>({
        label: address.street === '' ? 'Cesta' : address.street,
        value: ''
    });
    const [selectedAddress, setSelectedAddress] = useState<AddressProps>({
        street: address.street ?? '',
        zip: address.zip ?? '',
        city: address.city ?? '',
        country_code: address.country_code ?? "",
        region: address.region ?? ''
    });
    const [addressSearch, setAddressSearch] = useState<string>("");
    const [noOptionsString, setNoOptionsString] = useState<string>(t("No options"));
    const [selectedRegion, setSelectedRegion] = useState(regions.find((region: any) => region.value === address.region) ?? {
        value: '',
        label: 'Celotna Slovenija'
    });
    const sessionId = useRef<string>(makeId(8));

    useEffect(() => {
        if (address.country_code) {
            axios.get(`/api/country/code/${address.country_code}`).then((response) => {
                setSelectedCountry({
                    label: response.data.name,
                    value: response.data.code
                })
            })
        }

        axios.get('/api/countries')
            .then((response) => {
                const countriesObject: any[] = []
                response.data.forEach((country: any) => country.id && countriesObject.push({value: country.code, label: country.name}));

                setCountries(countriesObject);
            })

        if (selectedLocation.label === '' && setNextButtonDisabled) {
            setNextButtonDisabled(true);
        }

        let customRegion = regions.find((region) => region.label === 'Celotna Slovenija');
        if (!customRegion) {
            regions.push({value: null, label: 'Celotna Slovenija'})
        }

    }, []);

    const getLocationRecommendations = (value: string) => {
        let searchValue = value.toLowerCase();
        if (searchValue === '') searchValue = selectedLocation.label

        axios.post(`/api/google/places/autocomplete`, {
            "input": searchValue,
            "session": sessionId.current
        }).then((response) => {
            setAvailableLocations(response.data.suggestions.map((place: PlacePredictionInterface) => {
                return {
                    value: place.placePrediction.placeId,
                    label: place.placePrediction.text.text
                }
            }));
        }).catch(() => setNoOptionsString(t("No options")));
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

        axios.get(`/api/google/places/${place.value}`)
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
                                    newSelectedAddress.country_code = country.value;
                                } else {
                                    countryChange({label: component.longText});
                                    setSelectedCountry({value: component.shortText, label: component.longText});
                                    newSelectedAddress.country_code = component.shortText;
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
            }).finally(() => {
                if (setNextButtonDisabled) setNextButtonDisabled(false);
            });

    };

    let countryChange = (selectedOption: any) => {
        updateFields({address: {...address, country_code: selectedOption.value}});
        setSelectedCountry(selectedOption)
    }

    let regionChange = (selectedOption: any) => {
        updateFields({address: {...address, region: selectedOption.value}});
        setSelectedRegion(selectedOption)
    }

    return (
        <>
            <div className="mb-3">
                <label className={"form-label ps-0"}>{t("Street")} <span className={"text-danger"}>*</span></label>
                <Select options={availableLocations}
                        placeholder={`${t("Select")}...`}
                        onChange={(value) => value && setLocation(value as LocationProps)}
                        noOptionsMessage={() => noOptionsString}
                        value={selectedLocation}
                        isClearable={true}
                        onInputChange={e => setAddressSearch(e)}
                />
                <small>{t("Start typing and choose your address")}</small>
            </div>
            {selectedLocation.label !== '' &&
                <>
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
                                placeholder={`${t("Select")}...`}
                                value={selectedCountry}
                                onChange={(selectedOption) => countryChange(selectedOption)}/>
                    </div>

                    {showRegionSelect &&
                        <div className="mb-3">
                            <label className={"form-label ps-0"}>Pokrajina dela: </label>
                            <Select options={regions}
                                    placeholder={`${t("Select")}...`}
                                    value={selectedRegion}
                                    onChange={(selectedOption) => regionChange(selectedOption)}/>
                        </div>
                    }
                </>
            }
        </>
    )
}
