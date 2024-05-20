import {useLaravelReactI18n} from "laravel-react-i18n";
import {CompanyData} from "../../Interfaces/GlobalTypes";
import {Head, useForm, usePage} from "@inertiajs/react";
import BusinessLayout from "../../Layouts/BusinessLayout";
import PageSection from "../Parts/PageSection";
import Select from "react-select";
import {useState} from "react";
import axios from "axios";
import useGlobalContext from "../../Hooks/useGlobalContext";
import FancyTitle from "../../Components/FancyTitle";
import {JobInterface, WorkAreaInterface} from "../../Interfaces/SharedInterfaces";
import CompanyQuickView from "../Parts/CompanyQuickView";

interface NewJobProps {
    workAreas: Array<WorkAreaInterface>
    job?: JobInterface
}

export default function NewJob({workAreas, job}: NewJobProps) {
    const {t} = useLaravelReactI18n();
    const [workAreasArray, setWorkAreasArray] = useState(workAreas.map((area) => {
        return {
            value: area.id,
            label: area.name
        }
    }));
    const [workFieldsArray, setWorkFieldsArray] = useState([]);

    function initializeSelectedWorkField() {
        if (job === null) return null;

        return {
            value: job.work_field.id,
            label: job.work_field.name
        }
    }
    const [selectedWorkField, setSelectedWorkField] = useState(initializeSelectedWorkField);

    let noOptionsText = t("Please, select the work area before selecting work field.");
    let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const globalContext = useGlobalContext();

    let company: CompanyData = usePage().props.auth.company;

    const {data, setData, post, processing} = useForm({
        job_title: job !== null ? job.title : '',
        employment_type: job !== null ? job.employment_type : 'full_time',
        job_description: job !== null ? job.description : '',
        work_area_id: job !== null ? job.work_area_id : 0,
        work_field_id: job !== null ? job.work_field_id : 0,
        work_location: job !== null ? job.work_location : 'remote',
        num_of_positions: job !== null ? job.open_positions_count : 0,
        yearly_salary: job !== null ? job.salary : 0,
        currency: job !== null ? job.salary_currency : 'eur',
        gender: job !== null ? job.preferred_gender : 'any',
        education: job !== null ? job.preferred_education : 'none'
    })

    function showRelevantWorkFields(selectedArea) {
        setSelectedWorkField(null);

        setData(values => ({
            ...values,
            work_area_id: selectedArea.value,
            work_field_id: 0
        }));

        getRelatedWorkFields(selectedArea)
    }

    function getRelatedWorkFields(selectedArea) {
        axios.get('/work_area/'+selectedArea.value+'/fields')
            .then(response => {
                setWorkFieldsArray(response.data.map((workField) => ({
                    value: workField.id,
                    label: workField.name
                })));
            });
    }

    if (job !== null) getRelatedWorkFields(job.work_area_id);

    function handleEmploymentTypeChange(e) {
        setData(values => ({
            ...values,
            employment_type: e.target.value
        }));
    }

    function handleWorkFieldChange(e) {
        setSelectedWorkField(e);
        setData(values => ({
            ...values,
            work_field_id: e.value
        }));
    }

    function handleWorkLocationChange(e) {
        setData(values => ({
            ...values,
            work_location: e.target.value
        }));
    }

    function handleCurrencyChange(e) {
        setData(values => ({
            ...values,
            currency: e.target.value
        }));
    }

    function handleGenderChange(e) {
        setData(values => ({
            ...values,
            gender: e.target.value
        }));
    }

    function handleEducationChange(e) {
        setData(values => ({
            ...values,
            education: e.target.value
        }));
    }


    function handleSubmit(e) {
        e.preventDefault()
        post('/jobs/new', {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
            onError: (errors: string) => {
                let errorMessage = '';
                errors.map((error) => errorMessage += error + `<br >`)
                globalContext.FlashNotification.setText(errorMessage);
                globalContext.FlashNotification.setIsOpen('true');
                globalContext.FlashNotification.setStyle("danger");
            },
            onSuccess: () => {

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

                <form onSubmit={handleSubmit} className={"col-10 mx-auto"}>
                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Job Title")}</label>
                            <input
                                placeholder={t("Customer service representative")}
                                required={true}
                                className={"form-control"}
                                type="text"
                                value={job ? job.title : ''}
                                onChange={(e) => setData('job_title', e.target.value)}/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Employment type")}</label>
                            <select required className={"form-select"} onChange={handleEmploymentTypeChange} defaultValue={job && job.employment_type}>
                                <option value="full_time">{t("Full-Time")}</option>
                                <option value="part_time">{t("Part-Time")}</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Job description")}</label>
                            <textarea
                                placeholder={t("Handle customer complaints, provide appropriate solutions and alternatives...")}
                                rows={25}
                                required
                                className={"form-control"}
                                onChange={(e) => setData('job_description', e.target.value)}
                                value={job ? job.description : ''}
                            ></textarea>
                        </div>
                    </div>

                    <hr className={"my-4"}/>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Work area")}</label>
                            <Select options={workAreasArray}
                                    defaultValue={job && {
                                        value: job.work_area.id,
                                        label: job.work_area.name
                                    }}
                                    onChange={(selectedArea) => showRelevantWorkFields(selectedArea)}
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
                            <label>{t("Work location")}</label>
                            <select required className={"form-select"} onChange={handleWorkLocationChange} defaultValue={job && job.work_location}>
                                <option value="remote">{t("Completely online / Remote")}</option>
                                <option value="hybrid">{t("Partially online")}</option>
                                <option value="on_location">{t("On location")}</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Number of open positions")}</label>
                            <input
                                required
                                placeholder={'3'}
                                className={"form-control"}
                                value={job !== null ? job.open_positions_count : ''}
                                type="number"
                                min={1}
                                max={999}
                                step={1}
                                onChange={(e) => setData('num_of_positions', e.target.value)}
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
                                value={job !== null ? job.salary : ''}
                                step={0.5}
                                min={1}
                                type="number"
                                onChange={(e) => setData('yearly_salary', e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label>{t("Currency")}</label>
                            <select required className={"form-select"} onChange={handleCurrencyChange} defaultValue={job && job.salary_currency}>
                                <option value="eur">{t("EUR")}</option>
                                <option value="usd">{t("USD")}</option>
                                <option value="gbp">{t("GBP")}</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Preferred gender")}</label>
                            <select required className={"form-select"} onChange={handleGenderChange} defaultValue={job && job.preferred_gender}>
                                <option value="any">{t("Any")}</option>
                                <option value="male">{t("Male")}</option>
                                <option value="female">{t("Female")}</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Preferred education")}</label>
                            <select required className={"form-select"} onChange={handleEducationChange} defaultValue={job && job.preferred_education}>
                                <option value="none">{t("None")}</option>
                                <option value="primary">{t("Primary school or equivalent")}</option>
                                <option value="high_school">{t("High school or equivalent")}</option>
                                <option value="bachelor">{t("Bachelor's degree")}</option>
                                <option value="master">{t("Master's degree")}</option>
                                <option value="doctorate">{t("Doctorate or higher")}</option>
                            </select>
                        </div>
                    </div>

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
