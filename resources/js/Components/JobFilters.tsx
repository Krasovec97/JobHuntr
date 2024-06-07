import React, {useEffect, useState} from "react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {FilterTypes} from "../Interfaces/SharedInterfaces";
import Select from "react-select";
import axios from "axios";

interface JobFilterProps {
    filters: FilterTypes,
    setFilters: (filters: FilterTypes) => void,
    totalJobsCount: number,
    currentJobsCount: number
}

export default function JobFilters({filters, setFilters, totalJobsCount, currentJobsCount}: JobFilterProps) {
    const {t} = useLaravelReactI18n();
    const [workAreasArray, setWorkAreasArray] = useState<Array<object>>([{}]);
    const [workFieldsArray, setWorkFieldsArray] = useState<Array<object>>([{}]);
    const [selectedWorkAreas, setSelectedWorkAreas] = useState<Array<object>>([{}]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    let noOptionsText = t("Please, select the work area before selecting work field.");
    let workFieldsSelect = null;

    useEffect(() => {
        axios.get('/api/work_areas')
            .then((response) => {
                setWorkAreasArray(response.data.map((workArea) => {
                    return {
                        value: workArea.id,
                        label: workArea.name
                    }
                }))
            })
    }, []);

    useEffect(() => {
        let workAreaIds = [];
        selectedWorkAreas.forEach((workArea) => {
            workAreaIds.push(workArea.value);
        })
        let workAreaIdsString = '';
        if (workAreaIds.length > 0) {
            workAreaIdsString = workAreaIds.join(',');

            let workFieldsUrl = `/api/work_fields?work_area_ids=${workAreaIdsString}`;

            axios.get(workFieldsUrl)
                .then((response) => {
                    setWorkFieldsArray(response.data.map((workArea) => {
                        return {
                            value: workArea.id,
                            label: workArea.name
                        }
                    }))
                });
        }

        let newSearchFilter = {...filters};
        newSearchFilter.work_areas_string = workAreaIdsString;
        setFilters(newSearchFilter);
    }, [selectedWorkAreas])


    function updateSelectedWorkAreas(userSetWorkAreas) {
        if (userSetWorkAreas.length === 0) {
            setWorkFieldsArray([]);
            workFieldsSelect.clearValue();
        }
        setSelectedWorkAreas(userSetWorkAreas);
    }

    const handleLocationFilter = (location) => {
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

    const handleEmploymentTypeFilter = (employmentType) => {
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
    }, [searchTerm])

    const handleWorkFieldsFilter = (workFields) => {
        let workFieldIds = [];
        workFields.forEach((workFields) => {
            workFieldIds.push(workFields.value);
        })
        let workFieldsString = workFieldIds.join(',');

        let newSearchFilter = {...filters};
        newSearchFilter.work_fields_string = workFieldsString;
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
            </div>

            <div className="col-12 mt-3">
                <p className="fw-bold mb-0">{t("Employment Type")}:</p>
                <div>
                    <input onChange={() => handleEmploymentTypeFilter("full_time")} className="form-check-inline"
                           type="checkbox"/>
                    <label htmlFor="remote" className="form-check-label">{t("Full Time")}</label>
                </div>

                <div>
                    <input onChange={() => handleEmploymentTypeFilter("part_time")} className="form-check-inline"
                           type="checkbox"/>
                    <label htmlFor="hybrid" className="form-check-label">{t("Part Time")}</label>
                </div>
            </div>

            <div className="col-12 mt-3">
                <p className="fw-bold mb-0">{t("Work Areas")}:</p>
                <div>
                    <Select options={workAreasArray} isClearable isMulti onChange={(e) => updateSelectedWorkAreas(e)}/>
                </div>
            </div>

            <div className="col-12 mt-3">
                <p className="fw-bold mb-0">{t("Work Fields")}:</p>
                <div>
                    <Select
                        isClearable
                        ref={ref => workFieldsSelect = ref}
                        noOptionsMessage={({inputValue}) => !inputValue ? noOptionsText : "No results found"}
                        options={workFieldsArray}
                        isMulti
                        onChange={(e) => handleWorkFieldsFilter(e)}
                    />
                </div>
            </div>
        </>
    )
}
