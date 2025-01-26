import React, {useEffect, useState} from "react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {FilterTypes, LocationInterface, WorkFieldInterface} from "@/Interfaces/SharedInterfaces";
import Select from "react-select";
import axios from "axios";
import FormRange from "react-bootstrap/FormRange";

interface JobFilterProps {
    filters: FilterTypes,
    setFilters: (filters: FilterTypes) => void,
    totalJobsCount: number,
    currentJobsCount: number
}

export default function JobFilters({filters, setFilters, totalJobsCount, currentJobsCount}: JobFilterProps) {
    const {t} = useLaravelReactI18n();
    const [workFieldsArray, setWorkFieldsArray] = useState<Array<object>>([{}]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentLocation, setCurrentLocation] = useState<LocationInterface|undefined>();
    const [radius, setRadius] = useState<number>(50);

    useEffect(() => {
        let workFieldsUrl = `/api/work_fields`;

        axios.get(workFieldsUrl)
            .then((response) => {
                setWorkFieldsArray(response.data.map((workField: WorkFieldInterface) => {
                    return {
                        value: workField.id,
                        label: t(workField.name)
                    }
                }))
            });

        let newSearchFilter = {...filters};
        setFilters(newSearchFilter);


        navigator.geolocation.getCurrentPosition(currentPositionSuccess, null, {
            maximumAge: 1800000
        })
    }, []);

    function currentPositionSuccess(position: any) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCurrentLocation({ longitude, latitude });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
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

    const handleEmploymentTypeFilter = (employmentType: any) => {
        let newEmploymentTypeFilter = {...filters};
        let index = filters.employment_type.indexOf(employmentType);

        if (index !== -1) {
            newEmploymentTypeFilter.employment_type.splice(index, 1);
            setFilters(newEmploymentTypeFilter);
        } else {
            newEmploymentTypeFilter.employment_type.push(employmentType);
            setFilters(newEmploymentTypeFilter);
        }
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
            </div>

            <div className="col-12 mt-3">
                <p className="fw-bold mb-0">{t("Employment Type")}:</p>
                <div>
                    <input onChange={() => handleEmploymentTypeFilter("full_time")}
                           className="form-check-inline"
                           id={"full_time_filter"}
                           type="checkbox"/>
                    <label htmlFor="full_time_filter" className="form-check-label">{t("Full time")}</label>
                </div>

                <div>
                    <input onChange={() => handleEmploymentTypeFilter("part_time")}
                           className="form-check-inline"
                           id={"part_time_filter"}
                           type="checkbox"/>
                    <label htmlFor="part_time_filter" className="form-check-label">{t("Part time")}</label>
                </div>
                <div>
                    <input onChange={() => handleEmploymentTypeFilter("student")}
                           className="form-check-inline"
                           id={"student_filter"}
                           type="checkbox"/>
                    <label htmlFor="student_filter" className="form-check-label">{t("Student work")}</label>
                </div>
                <div>
                    <input onChange={() => handleEmploymentTypeFilter("contract")}
                           className="form-check-inline"
                           id={"contract_filter"}
                           type="checkbox"/>
                    <label htmlFor="contract_filter" className="form-check-label">{t("By contract")}</label>
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
                    <small className="text-danger">
                        {t("To use this filter, we need the access to your location.")}
                    </small>
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
