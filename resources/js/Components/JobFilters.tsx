import React from "react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {FilterTypes} from "../Interfaces/SharedInterfaces";

interface JobFilterProps {
    filters: FilterTypes,
    setFilters: (filters: FilterTypes) => void
}

export default function JobFilters({filters, setFilters}: JobFilterProps) {
    const {t} = useLaravelReactI18n();

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

    return (
        <>
            <h3 className='fw-bold'>{t("Filters")}:</h3>
            <hr/>
            <div className="col-12">
                <p className="fw-bold mb-0">{t("Location")}:</p>
                <div>
                    <input onChange={(e) => handleLocationFilter("remote")} className="form-check-inline"
                           type="checkbox" id="remote"/>
                    <label htmlFor="remote" className="form-check-label">{t("Remote jobs")}</label>
                </div>

                <div>
                    <input onChange={(e) => handleLocationFilter("hybrid")} className="form-check-inline"
                           type="checkbox" id="hybrid"/>
                    <label htmlFor="hybrid" className="form-check-label">{t("Hybrid jobs")}</label>
                </div>

                <div>
                    <input onChange={(e) => handleLocationFilter("on_location")} className="form-check-inline"
                           type="checkbox" id="on_location"/>
                    <label htmlFor="on_location" className="form-check-label">{t("On location")}</label>
                </div>
            </div>

            <div className="col-12 mt-3">
                <p className="fw-bold mb-0">{t("Employment Type")}:</p>
                <div>
                    <input onChange={(e) => handleEmploymentTypeFilter("full_time")} className="form-check-inline"
                           type="checkbox"/>
                    <label htmlFor="remote" className="form-check-label">{t("Full Time")}</label>
                </div>

                <div>
                    <input onChange={(e) => handleEmploymentTypeFilter("part_time")} className="form-check-inline"
                           type="checkbox"/>
                    <label htmlFor="hybrid" className="form-check-label">{t("Part Time")}</label>
                </div>
            </div>
        </>
    )
}
