import React, {useEffect, useState} from "react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {
    EducationInterface,
    FilterTypes,
    LocationInterface,
    UserAuthProps,
    WorkFieldInterface
} from "@/Interfaces/SharedInterfaces";
import Select from "react-select";
import axios from "axios";
import FormRange from "react-bootstrap/FormRange";
import {parseEmploymentType, regions} from "@/Helpers";
import {usePage} from "@inertiajs/react";

interface JobFilterProps {
    filters: FilterTypes,
    setFilters: (filters: FilterTypes) => void,
    totalJobsCount: number,
    currentJobsCount: number
}

interface SelectOptionInterface {
    value: string|number|null,
    label: string,
}

export default function JobFilters({filters, setFilters, totalJobsCount, currentJobsCount}: JobFilterProps) {
    const {t} = useLaravelReactI18n();

    const [workFieldsArray, setWorkFieldsArray] = useState<Array<object>>([{}]);
    const [availableEmploymentTypesArray, setAvailableEmploymentTypesArray] = useState<Array<object>>([{}]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentLocation, setCurrentLocation] = useState<LocationInterface|undefined>();
    const [radius, setRadius] = useState<number>(50);
    const [availableEducations, setAvailableEducations] = useState<SelectOptionInterface[]>([]);
    const [selectedEducation, setSelectedEducation] = useState();
    const user = usePage<UserAuthProps>().props.auth.user;

    useEffect(() => {

        axios.get(`/api/work_fields`)
            .then((response) => {
                setWorkFieldsArray(response.data.map((workField: WorkFieldInterface) => {
                    return {
                        value: workField.id,
                        label: t(workField.name)
                    }
                }))
            });

        axios.get(`/api/employment_types`)
            .then((response) => {
                setAvailableEmploymentTypesArray(response.data.map((availableEmploymentType: string) => {
                    return {
                        value: availableEmploymentType,
                        label: t(parseEmploymentType(availableEmploymentType))
                    }
                }))
            });

        axios.get('/api/educations').then((response) => {
            let educations: EducationInterface[] = response.data;
            let options: SelectOptionInterface[] = [];

            educations.forEach((education: EducationInterface) => {
                options.push({value: education.id, label: t(education.title)});
            });

            setAvailableEducations(options);
        })

        let newSearchFilter = {...filters};
        setFilters(newSearchFilter);


        navigator.geolocation.getCurrentPosition(currentPositionSuccess, null);
    }, []);

    function currentPositionSuccess(position: any) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCurrentLocation({ longitude, latitude });
    }

    const handleLocationFilter = (location: any) => {
        let newLocationFilters = {...filters};
        let index = filters.location.indexOf(location);
        console.log(location);

        if (index !== -1) {
            newLocationFilters.location.splice(index, 1);
            setFilters(newLocationFilters);
        } else {
            newLocationFilters.location.push(location);
            setFilters(newLocationFilters);
        }
    }

    const handleEmploymentTypeFilter = (targetEmploymentTypes: any[]) => {
        let employmentTypes: any[] = [];

        targetEmploymentTypes.forEach((targetEmploymentType: any) => {
            if (!employmentTypes.includes(targetEmploymentType.value)) {
                employmentTypes.push(targetEmploymentType.value);
            }
        })

        let newSearchFilter = {...filters};
        newSearchFilter.employment_types = employmentTypes;

        setFilters(newSearchFilter);
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let newSearchFilter = {...filters};
            newSearchFilter.search_string = searchTerm;
            setFilters(newSearchFilter);
        }, 400)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm]);

    const handleWorkFieldsFilter = (workFields: any) => {
        let workFieldIds: any = [];
        workFields.forEach((workFields: any) => {
            workFieldIds.push(workFields.value);
        })
        let workFieldsString = workFieldIds.join(',');

        let newSearchFilter = {...filters};
        newSearchFilter.work_fields_string = workFieldsString;
        setFilters(newSearchFilter);
    }

    const handleRadiusFilter = () => {
        let newFilters = {...filters};

        if (radius < 90 && currentLocation) {
            newFilters.radius = radius
            newFilters.current_position = currentLocation;
        } else {
            newFilters.radius = undefined;
            newFilters.current_position = undefined;
        }

        setFilters(newFilters);
    }

    function handleEducationChange(e: any) {
        let newFilters = {...filters};
        setSelectedEducation(e);

        if (e && e.value) {
            newFilters.education_id = e.value
        } else {
            newFilters.education_id = null;
        }

        setFilters(newFilters);
    }

    function handleRegionChange(regionsArray: any) {
        let selectedRegions: any = [];
        regionsArray.forEach((region: any) => {
            selectedRegions.push(region.value);
        })
        let selectedRegionsString = selectedRegions.join(',');

        let newSearchFilter = {...filters};
        newSearchFilter.regions_string = selectedRegionsString;
        setFilters(newSearchFilter);

    }

    return (
        <>
            <h3 className='fw-bold'>{t("Filters")}:</h3>
            {currentJobsCount !== totalJobsCount ?
                <p className="m-0">{t("Showing :currentCount / :totalCount jobs", {
                    'currentCount': currentJobsCount,
                    'totalCount': totalJobsCount
                })}</p>
                :
                <p className="m-0">{t("We currently have :totalCount amazing jobs waiting for you!", {'totalCount': totalJobsCount})}</p>

            }
            <hr/>
            <div className="col-12 mt-3">
                <p className="fw-bold mb-0" title={t("Search by job title")}>{t("Search")}:</p>
                <small></small>
                <div>
                    <input onChange={(e) => setSearchTerm(e.target.value)} className="form-control"
                           type="text" id="search" placeholder={t("Search by job title...")}/>
                </div>
            </div>

            <div className="col-12 mt-3">
                <p className="fw-bold mb-0">{t("Location")}:</p>
                <div>
                    <input onChange={() => handleLocationFilter("on_location")} className="form-check-inline"
                           type="checkbox" id="on_location"/>
                    <label htmlFor="on_location" className="form-check-label">{t("On location")}</label>
                </div>
                <div>
                    <input onChange={() => handleLocationFilter("remote")} className="form-check-inline"
                           type="checkbox" id="remote"/>
                    <label htmlFor="remote" className="form-check-label">{t("Remote")}</label>
                </div>

                <div>
                    <input onChange={() => handleLocationFilter("hybrid")} className="form-check-inline"
                           type="checkbox" id="hybrid"/>
                    <label htmlFor="hybrid" className="form-check-label">{t("Hybrid")}</label>
                </div>

                <div>
                    <input onChange={() => handleLocationFilter("field_work")} className="form-check-inline"
                           type="checkbox" id="hybrid"/>
                    <label htmlFor="hybrid" className="form-check-label">{t("Field work")}</label>
                </div>
            </div>

            <div className="col-12 mt-3">
                <p className="fw-bold mb-0">{t("Employment Type")}:</p>
                <div>
                    <Select
                        isClearable
                        options={availableEmploymentTypesArray}
                        isMulti
                        onChange={(e: any) => handleEmploymentTypeFilter(e)}
                    />
                </div>
            </div>

            <div className="col-12 mt-3">
                <p className="fw-bold mb-0">{t("Work Fields")}:</p>
                <div>
                    <Select
                        isClearable
                        options={workFieldsArray}
                        isMulti
                        onChange={(e) => handleWorkFieldsFilter(e)}
                    />
                </div>
            </div>

            <div className="col-12 mt-3">
                <div className="mb-3">
                    <label className="fw-bold">{t("Minimal education required")}</label>
                    <Select options={availableEducations}
                            placeholder={`${t("Select")}...`}
                            id="education"
                            isClearable
                            value={selectedEducation}
                            onChange={handleEducationChange} />
                </div>
            </div>

            {(filters.location.includes('on_location') || filters.location.includes('hybrid')) &&
                <>
                    <div className="col-12 mt-3">
                        <p className="fw-bold mb-0">{t("Radius")}:</p>
                        {currentLocation === undefined &&
                            <button className="text-danger bg-transparent border-0 text-start" type="button" onClick={() => navigator.geolocation.getCurrentPosition(currentPositionSuccess, null)}>
                                {t("To use this filter, we need the access to your location.")}
                            </button>
                        }
                        <div>
                            <FormRange min={10} max={90} step={10}
                                       disabled={currentLocation === undefined}
                                       defaultValue={radius}
                                       onChange={(e) => setRadius(Number(e.target.value))}
                                       onMouseUp={() => handleRadiusFilter()}
                            />
                            <small className="form-text text-muted">
                                {radius > 80 ?
                                    t("Show all job posts")
                                    :
                                    t("Show job post in the radius of :radius km", {'radius': radius})
                                }
                            </small>
                        </div>
                    </div>

                    {user && user.country_id === 203 &&
                        <div className="col-12 mt-3">
                            <p className="fw-bold mb-0">Regije:</p>
                            <div>
                                <Select
                                    isClearable
                                    options={regions}
                                    isMulti
                                    onChange={(e) => handleRegionChange(e)}
                                />
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
}
