import {useLaravelReactI18n} from "laravel-react-i18n";
import {Head, useForm, usePage} from "@inertiajs/react";
import BusinessLayout from "@/Layouts/BusinessLayout";
import PageSection from "@/Components/PageSection";
import Select from "react-select";
import {useState} from "react";
import axios from "axios";
import useGlobalContext from "@/Hooks/useGlobalContext";
import FancyTitle from "@/Components/FancyTitle";
import {
    CompanyData,
    CompanyAuthProps,
    JobInterface,
    WorkFieldInterface
} from "@/Interfaces/SharedInterfaces";
import CompanyQuickView from "../Parts/CompanyQuickView";
import React from "react";
import Tiptap from "@/Components/Tiptap";
import GoogleLocationSelect from "@/Components/GoogleLocationSelect";

interface NewJobProps {
    job?: JobInterface|null,
    errors?: string[]
}

interface FormDataType {
    job_title: string,
    employment_type: string,
    job_description: string,
    work_field_id: number,
    work_location: string,
    num_of_positions: number,
    yearly_salary: number,
    currency: string,
    education: string,
    application_mail: string,
    address: {
        street: string,
        city: string,
        zip: string,
        country_code: string,
    }
}

type WorkField = {
    value: number;
    label: string;
};

let initialRender = true

export default function NewJob({job = null, errors}: NewJobProps) {
    const {t} = useLaravelReactI18n();
    const [workFieldsArray, setWorkFieldsArray] = useState<Array<WorkField>>([]);
    let csrfToken = document.querySelector("meta[name='csrf-token']")?.getAttribute("content");
    const globalContext = useGlobalContext();
    let company: CompanyData = usePage<CompanyAuthProps>().props.auth.company;


    const {data, setData, post, processing} = useForm<FormDataType>({
        job_title: job?.title ?? '',
        employment_type: job?.employment_type ?? 'full_time',
        job_description: job?.description ?? '',
        work_field_id: job?.work_field_id ?? 0,
        work_location: job?.work_location ?? 'remote',
        num_of_positions: job?.open_positions_count ?? 0,
        yearly_salary: job?.salary ?? 0,
        currency: job?.salary_currency ?? 'eur',
        education: job?.preferred_education ?? 'none',
        application_mail: job?.application_mail ?? '',
        address: {
            street: job?.street ?? '',
            city: job?.city ?? '',
            zip: job?.zip ?? '',
            country_code: job?.country_code ?? '',
        }
    })

    const workField = workFieldsArray.find(item => item.value === data.work_field_id) || {
        value: job?.work_field?.id,
        label: t(job?.work_field?.name ?? '')
    }


    if (initialRender) {
        axios.get("/api/work_fields?all=true")
            .then((response) => {
                setWorkFieldsArray(response.data.map((workField: WorkFieldInterface) => {
                    return {
                        value: workField.id,
                        label: t(workField.name)
                    }
                }))
            })
            .finally(() => initialRender = false)
    }

    function updateFields(fields: Partial<FormDataType>) {
        setData(prevState => {
            return {...prevState, ...fields};
        })
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
                                onChange={(e) => updateFields({job_title: e.target.value})}/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Employment type")}</label>
                            <select required className={"form-select"} onChange={(event) => updateFields({employment_type: event.target.value})}
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
                                <Tiptap content={job?.description} setEditorContent={(content) => updateFields({job_description: content})}/>
                            </div>
                        </div>
                    </div>

                    <hr className={"my-4"}/>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Work location")}</label>
                            <select required className={"form-select"} onChange={(event) => updateFields({work_location: event.target.value})}
                                    defaultValue={job?.work_location}>
                                <option value="remote">{t("Completely online / Remote")}</option>
                                <option value="hybrid">{t("Partially online")}</option>
                                <option value="on_location">{t("On location")}</option>
                            </select>
                        </div>
                    </div>

                    {data.work_location !== 'remote' &&
                        <GoogleLocationSelect updateFields={updateFields} address={data.address} />
                    }

                    <hr className={"my-4"}/>

                    <div className="row mb-3">
                        <div className="col-12">
                            <label>{t("Work field")}</label>
                            <Select
                                options={workFieldsArray}
                                value={workField}
                                onChange={(event) => event && updateFields({work_field_id: event.value})}
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
                                onChange={(e) => updateFields({num_of_positions: e.target.valueAsNumber})}
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
                                onChange={(e) => updateFields({yearly_salary: e.target.valueAsNumber})}
                            />
                        </div>
                        <div className="col-4">
                            <label>{t("Currency")}</label>
                            <select required className={"form-select"} onChange={(event) => updateFields({currency: event.target.value})}
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
                            <select required className={"form-select"} onChange={(event) => updateFields({education: event.target.value})}
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
                                onChange={(e) => updateFields({application_mail: e.target.value})}
                            />
                            <small>{t(`You may leave this empty and it will be set to the same email as your company's email`)}</small>
                        </div>
                    </div>

                    {errors && errors.length > 0 &&
                        <div className="row mb-3">
                            <div className="col-12">
                                <ul>
                                    {errors.map(e => <li>{e}</li>)}
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
