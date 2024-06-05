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
    const [workAreasArray, setWorkAreasArray] = useState([{}]);

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


    function getRelevantWorkFields() {
        //TODO Finish tomorrow
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

    const handleSearchFilter = (string) => {
        let newSearchFilter = {...filters};
        newSearchFilter.search_string = string;
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
                    <input onChange={(e) => handleSearchFilter(e.target.value)} className="form-control"
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
                    <Select options={workAreasArray} isMulti autoFocus />
                </div>
            </div>
        </>
    )
}
