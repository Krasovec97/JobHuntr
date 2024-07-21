import {useLaravelReactI18n} from "laravel-react-i18n";
import {Head, useForm, usePage} from "@inertiajs/react";
import BusinessLayout from "../../Layouts/BusinessLayout";
import PageSection from "../../Components/PageSection";
import Select from "react-select";
import {useEffect, useState} from "react";
import axios from "axios";
import useGlobalContext from "../../Hooks/useGlobalContext";
import FancyTitle from "../../Components/FancyTitle";
import {
    CompanyData,
    Country,
    CompanyAuthProps,
    JobInterface,
    PlaceInterface,
    SectorInterface
} from "../../Interfaces/SharedInterfaces";
import CompanyQuickView from "../Parts/CompanyQuickView";
import {AddressSelection} from "../../Styles/SharedStyles";
import React from "react";
import Tiptap from "../../Components/Tiptap";

interface NewJobProps {
    job?: JobInterface|null,
    errors?: string[]
}

export default function NewJob({job = null, errors}: NewJobProps) {
    const {t} = useLaravelReactI18n();
    const [sectorsArray, setSectorsArray] = useState([]);
    const [workFieldsArray, setWorkFieldsArray] = useState([]);
    const [selectedWorkField, setSelectedWorkField] = useState({});
    const [availableLocations, setAvailableLocations] = useState([]);
    const [userConfirmedAddress, setUserConfirmedAddress] = useState(false);
    const [addressSearch, setAddressSearch] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [editorContent, setEditorContent] = useState(job?.description ?? '');
    let noOptionsText = t("Please, select the sector before selecting work field.");
    let csrfToken = document.querySelector("meta[name='csrf-token']")?.getAttribute("content");
    const globalContext = useGlobalContext();
    let company: CompanyData = usePage<CompanyAuthProps>().props.auth.company;

    const {data, setData, post, processing} = useForm({
        job_title: job?.title ?? '',
        employment_type: job?.employment_type ?? 'full_time',
        job_description: job?.description ?? '',
        sector_id: job?.sector_id ?? 0,
        work_field_id: job?.work_field_id ?? 0,
        work_location: job?.work_location ?? 'remote',
        num_of_positions: job?.open_positions_count ?? 0,
        yearly_salary: job?.salary ?? 0,
        currency: job?.salary_currency ?? 'eur',
        education: job?.preferred_education ?? 'none',
        street: job?.street ?? '',
        city: job?.city ?? '',
        zip: job?.zip ?? '',
        country: job?.country ?? '',
        application_mail: job?.application_mail ?? '',
    })

    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=false&value=code"
        )
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.countries);
            });

        axios.get("/sectors").then((response) => {
            setSectorsArray(response.data.map((sector: SectorInterface) => {
                return {
                    value: sector.id,
                    label: t(sector.name)
                }
            }))
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

    useEffect(() => {
        setData(values => ({
            ...values,
            job_description: editorContent
        }));
    }, [editorContent]);

    useEffect(() => {
        if (job !== null) {
            setSelectedWorkField({
                value: job?.work_field?.id,
                label: t(job?.work_field?.name ?? '')
            })
        }
    }, [job]);

    function getRelatedWorkFields(selectedSector: any) {
        if (typeof selectedSector !== "undefined") {
            axios.get('/sector/'+selectedSector.value+'/fields')
                .then(response => {
                    setWorkFieldsArray(response.data.map((workField: any) => ({
                        value: workField.id,
                        label: t(workField.name)
                    })));
                });
        }
    }

    function showRelevantWorkFields(selectedSector: any) {
        setData(values => ({
            ...values,
            sector_id: selectedSector.value,
            work_field_id: 0
        }));

        getRelatedWorkFields(selectedSector)
    }

    if (job !== null) {
        useEffect(() => {
            getRelatedWorkFields({value: job.sector_id})
            countries.forEach((country: Country) => {
                if (country.label === job.country) {
                    setSelectedCountry(country);
                }
            })
        }, [countries]);
    }

    function handleEmploymentTypeChange(e: { target: { value: string; }; }) {
        setData(values => ({
            ...values,
            employment_type: e.target.value
        }));
    }

    function handleWorkFieldChange(e: any) {
        setSelectedWorkField(e);
        setData(values => ({
            ...values,
            work_field_id: e.value
        }));
    }

    function handleWorkLocationChange(e: { target: { value: string; }; }) {
        setData(values => ({
            ...values,
            work_location: e.target.value
        }));
    }

    function handleCurrencyChange(e: { target: { value: string; }; }) {
        setData(values => ({
            ...values,
            currency: e.target.value
        }));
    }

    function handleEducationChange(e: { target: { value: string; }; }) {
        setData(values => ({
            ...values,
            education: e.target.value
        }));
    }

    let updateAddressInput = (address: string) => {
        setData(values => ({
            ...values,
            street: address
        }));
        setAddressSearch(address);
    }

    let parseAndSetAddress = (place: any) => {
        let houseNumber: null = null;
        let streetName: null = null;
        let city: null = null;

        place.addressComponents.forEach((component: any) => {
            switch (component.types[0]) {
                case 'street_number':
                    houseNumber = component.longText
                    break;
                case 'route':
                    streetName = component.longText;
                    break;
                case 'postal_town':
                    setData(values => ({
                        ...values,
                        city: component.longText
                    }));
                    city = component.longText;
                    break;
                case 'country':
                    countries.forEach((country: Country) => {
                        if (country.value === component.shortText) {
                            countryChange(country);
                            setSelectedCountry(country);
                        } else {
                            countryChange({label: component.longText});
                            setSelectedCountry({value: component.shortText, label: component.longText});
                        }
                    })
                    break;
                case 'postal_code':
                    setData(values => ({
                        ...values,
                        zip: component.longText
                    }));
                    break;
                case 'administrative_area_level_1':
                    if (city === null) {
                        setData(values => ({
                            ...values,
                            city: component.longText
                        }));
                    }
                    break;
            }
        });

        setData(values => ({
            ...values,
            street: streetName + " " + houseNumber,
            coordinates: place.location
        }));

        setUserConfirmedAddress(true);
        setAvailableLocations([]);
        setAddressSearch(streetName + " " + houseNumber);
    }

    let countryChange = (selectedOption: any) => {
        setData(values => ({
            ...values,
            country: selectedOption?.label ?? ''
        }));
        setSelectedCountry(selectedOption ?? '')
    }


    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault()
        let postUrl = '/jobs/new';
        if (job !== null) postUrl = `/job/${job?.id}/update`
        post(postUrl, {
            headers: {
                'X-CSRF-TOKEN': csrfToken ?? ''
            },
            onError: (errors: any|string|string[]) => {
                let errorMessage = '';
                if (typeof errors !== "string") {
                    errors.map((error: string) => errorMessage += error + `<br >`)
                } else {
                    errorMessage = errors
                }
                globalContext?.FlashNotification.setText(errorMessage);
                globalContext?.FlashNotification.setIsOpen('true');
                globalContext?.FlashNotification.setStyle("danger");
            },
            preserveScroll: true
        });
    }

    return (
        <BusinessLayout>
            <Head title={t("[Business] Create a job")} />

            <PageSection className={'bg-white full-h'}>
                <CompanyQuickView company={company}/>

                <FancyTitle heading={t("Create a new job")} subtitle={""} />

                <form onSubmit={handleSubmit} className={"col-12 col-md-10 mx-auto"}>
                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Job Title")}</label>
                            <input
                                placeholder={t("Customer service representative")}
                                required={true}
                                className={"form-control"}
                                type="text"
                                defaultValue={job ? job.title : undefined}
                                onChange={(e) => setData('job_title', e.target.value)}/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Employment type")}</label>
                            <select required className={"form-select"} onChange={handleEmploymentTypeChange}
                                    defaultValue={job ? job.employment_type : undefined}>
                                <option value="full_time">{t("Full-Time")}</option>
                                <option value="part_time">{t("Part-Time")}</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Job description")}</label>
                            <div className="card">
                                <Tiptap content={job?.description} setEditorContent={setEditorContent}/>
                            </div>
                        </div>
                    </div>

                    <hr className={"my-4"}/>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Work location")}</label>
                            <select required className={"form-select"} onChange={handleWorkLocationChange}
                                    defaultValue={job?.work_location}>
                                <option value="remote">{t("Completely online / Remote")}</option>
                                <option value="hybrid">{t("Partially online")}</option>
                                <option value="on_location">{t("On location")}</option>
                            </select>
                        </div>
                    </div>

                    {data.work_location !== 'remote' && (
                        <>
                            <div className="mb-3">
                                <label className={"form-label ps-0"}>{t("Street")}</label>
                                <input
                                    autoFocus
                                    className={"form-control"}
                                    type="text"
                                    defaultValue={data.street}
                                    onChange={e => updateAddressInput(e.target.value)}
                                />

                                <div className="border rounded p-2 mt-2" hidden={availableLocations.length === 0}>
                                    {availableLocations.length > 0 && !userConfirmedAddress && availableLocations.map((place: PlaceInterface, index) => {
                                        return (
                                            <AddressSelection key={index} onClick={() => parseAndSetAddress(place)}
                                                              className="p-2">
                                                {place.formattedAddress}
                                            </AddressSelection>
                                        )
                                    })}
                                </div>
                            </div>
                            <small>{t("If the job's location is the same as your company location, you may leave this fields empty. The job location will be the same as your company's location!")}</small>

                            <div className="mb-3">
                                <label className={"form-label ps-0"}>{t("Zip")}</label>
                                <input
                                    className={"form-control"}
                                    type="text"
                                    defaultValue={data.zip}
                                    onChange={e => setData('zip', e.target.value)}/>
                            </div>

                            <div className="mb-3">
                                <label className={"form-label ps-0"}>{t("City")}</label>
                                <input
                                    className={"form-control"}
                                    type="text"
                                    defaultValue={data.city}
                                    onChange={e => setData('city', e.target.value)}/>
                            </div>

                            <div className="mb-3">
                                <label className={"form-label ps-0"}>{t("Country")}</label>
                                <Select options={countries}
                                        value={selectedCountry}
                                        onChange={(selectedOption) => countryChange(selectedOption)}/>
                            </div>
                        </>
                    )}

                    <hr className={"my-4"}/>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Sector")}</label>
                            <Select options={sectorsArray}
                                    defaultValue={{
                                        value: job?.sector?.id,
                                        label: job?.sector?.name
                                    }}
                                    onChange={(selectedSector) => showRelevantWorkFields(selectedSector)}
                                    required={true}/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Work field")}</label>
                            <Select
                                noOptionsMessage={({inputValue}) => !inputValue ? noOptionsText : "No results found"}
                                options={workFieldsArray}
                                value={selectedWorkField} onChange={handleWorkFieldChange}
                                required={true}/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Number of open positions")}</label>
                            <input
                                required
                                placeholder={'3'}
                                className={"form-control"}
                                defaultValue={job?.open_positions_count}
                                type="number"
                                min={1}
                                max={999}
                                step={1}
                                onChange={(e) => setData('num_of_positions', e.target.valueAsNumber)}
                            />
                        </div>
                    </div>

                    <hr className={"my-4"}/>

                    <div className="row mb-3">
                        <div className="col-8">
                            <label>{t("Estimated yearly salary")}</label>
                            <input
                                required
                                placeholder={'42000'}
                                className={"form-control"}
                                defaultValue={job?.salary}
                                step={0.5}
                                min={1}
                                type="number"
                                onChange={(e) => setData('yearly_salary', e.target.valueAsNumber)}
                            />
                        </div>
                        <div className="col-4">
                            <label>{t("Currency")}</label>
                            <select required className={"form-select"} onChange={handleCurrencyChange}
                                    defaultValue={job?.salary_currency}>
                                <option value="eur">EUR</option>
                                <option value="usd">USD</option>
                                <option value="gbp">GBP</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Preferred education")}</label>
                            <select required className={"form-select"} onChange={handleEducationChange}
                                    defaultValue={job?.preferred_education}>
                                <option value="none">{t("None")}</option>
                                <option value="primary">{t("Primary school or equivalent")}</option>
                                <option value="high_school">{t("High school or equivalent")}</option>
                                <option value="bachelor">{t("Bachelor's degree or equivalent")}</option>
                                <option value="master">{t("Master's degree or equivalent")}</option>
                                <option value="doctorate">{t("Doctorate")}</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Application email")}</label>
                            <input
                                placeholder={t('apply@company.com')}
                                className={"form-control"}
                                defaultValue={job?.application_mail}
                                type="text"
                                onChange={(e) => setData('application_mail', e.target.value)}
                            />
                            <small>{t(`You may leave this empty and it will be set to the same email as your company's email`)}</small>
                        </div>
                    </div>

                    {errors && errors.length > 0 &&
                        <div className="row mb-3">
                            <div className="col-12">
                                <ul>
                                    {errors.map(e => {
                                        <li>{e}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    }

                    <div className="row mb-3">
                        <div className="col-12 text-end">
                            <button disabled={processing} className={"btn btn-primary px-4"}>{t("Submit")}</button>
                        </div>
                    </div>
                </form>
            </PageSection>

        </BusinessLayout>
    );
}
