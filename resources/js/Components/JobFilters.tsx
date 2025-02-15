import React, {useEffect, useState} from "react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {FilterTypes, LocationInterface, WorkFieldInterface} from "@/Interfaces/SharedInterfaces";
import Select from "react-select";
import axios from "axios";
import FormRange from "react-bootstrap/FormRange";
import {parseEmploymentType} from "@/Helpers";

interface JobFilterProps {
    filters: FilterTypes,
    setFilters: (filters: FilterTypes) => void,
    totalJobsCount: number,
    currentJobsCount: number
}

export default function JobFilters({filters, setFilters, totalJobsCount, currentJobsCount}: JobFilterProps) {
    const {t} = useLaravelReactI18n();

    // let availableEmploymentTypesArray = [
    //     {
    //         value: 'full_time',
    //         label: t("Permanent employment")
    //     },
    //     {
    //         value: 'full_time_fixed_term',
    //         label: t("Permanent employment, fixed term")
    //     },
    //     {
    //         value: 'part_time',
    //         label: t("Part-time work")
    //     },
    //     {
    //         value: 'contract',
    //         label: t("Contract work")
    //     },
    //     {
    //         value: 'project',
    //         label: t("Project work")
    //     },
    //     {
    //         value: 'casual',
    //         label: t("Casual work")
    //     },
    //     {
    //         value: 'student',
    //         label: t("Student work")
    //     },
    //     {
    //         value: 'practical_training',
    //         label: t("Practical training")
    //     },
    //     {
    //         value: 'retiree_work',
    //         label: t("Work for retirees")
    //     },
    // ]

    const [workFieldsArray, setWorkFieldsArray] = useState<Array<object>>([{}]);
    const [availableEmploymentTypesArray, setAvailableEmploymentTypesArray] = useState<Array<object>>([{}]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentLocation, setCurrentLocation] = useState<LocationInterface|undefined>();
    const [radius, setRadius] = useState<number>(50);

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

        console.log(newSearchFilter);
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
        </>
    )
}
