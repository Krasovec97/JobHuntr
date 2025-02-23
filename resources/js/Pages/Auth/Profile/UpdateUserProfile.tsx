import {useForm, usePage} from "@inertiajs/react";
import Select from "react-select";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {useEffect, useState} from "react";
import useGlobalContext from "@/Hooks/useGlobalContext";
import {EducationInterface, UserData} from "@/Interfaces/SharedInterfaces";
import React from "react";
import GoogleLocationSelect from "@/Components/GoogleLocationSelect";
import axios from "axios";
import DatePicker, {registerLocale} from "react-datepicker";
import {sl} from "date-fns/locale";

import "react-datepicker/dist/react-datepicker.css";
registerLocale('sl', sl)

interface UserObjectData {
    user_id: number,
    date_of_birth: string,
    education_id: string,
    contact_phone: string,
    address: {
        street: string,
        city: string,
        country_code: number,
        zip: string,
    },
    coordinates: {
        latitude: number,
        longitude: number,
    }
}

interface SelectOptionInterface {
    value: string|number,
    label: string,
}

export default function () {
    const {t} = useLaravelReactI18n();
    let {user} = usePage<{ auth: { user: UserData } }>().props.auth;
    const [selectedEducation, setSelectedEducation] = useState<SelectOptionInterface>();
    const [availableEducations, setAvailableEducations] = useState<SelectOptionInterface[]>([]);
    const globalContext = useGlobalContext();
    const {data, setData, post, processing} = useForm({
        user_id: user.id,
        date_of_birth: user.date_of_birth ?? '',
        education_id: user.education_id ?? '',
        contact_phone: user.contact_phone,
        address: {
            street: user.street,
            city: user.city,
            country_code: user.country_code!,
            zip: user.zip,
        },
        coordinates: {
            latitude: user.coordinates.latitude,
            longitude: user.coordinates.longitude,
        }
    });

    useEffect(() => {
        axios.get('/api/educations').then((response) => {
            let educations: EducationInterface[] = response.data;
            let options: SelectOptionInterface[] = [];

            educations.forEach((education: EducationInterface) => {
                options.push({value: education.id, label: t(education.title)});
            });

            let userEducation = educations.find(education => education.id === user.education_id);

            if (userEducation) {
                setSelectedEducation({
                    value: userEducation.id,
                    label: t(userEducation.title),
                })
            }
            setAvailableEducations(options);
        })
    }, []);

    function updateFields(fields: Partial<UserObjectData>) {
        setData((prevState: any) => {
            return {...prevState, ...fields};
        })
    }

    function handleEducationChange(e: any) {
        updateFields({education_id: e.value});
        setSelectedEducation(e);
    }

    const date = new Date();

    function handleSubmit(e: any) {
        e.preventDefault();
        post('/user/update', {
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
            onSuccess: () => {
                globalContext?.FlashNotification.setText(t("Account updated!"));
                globalContext?.FlashNotification.setIsOpen('true');
                globalContext?.FlashNotification.setStyle("success");
            },
            preserveScroll: true
        });
    }


    return (
        <div className={"col-12 mx-auto"}>
            <form onSubmit={handleSubmit} className={"col-12 mx-auto"}>
                <div className="mb-3">
                    <label className={"form-label ps-0"}>{t("Contact Phone")} <span
                        className={"text-danger"}>*</span></label>
                    <input
                        id="contact_phone"
                        required={true}
                        className={"form-control"}
                        type="text"
                        value={data.contact_phone}
                        pattern={"^\\+\\d.*"}
                        onChange={(event) => {updateFields({contact_phone: event.target.value})}}/>
                    <small>
                        {t("Please include country code for your telephone number (Start with +). Your telephone number also shouldn't contain any spaces.")}
                    </small>
                </div>

                <div className="mb-3">
                    <GoogleLocationSelect updateFields={updateFields} address={data.address}/>
                </div>

                <div className="mb-3">
                    <label className={"form-label ps-0"}>{t("Your education")}</label>
                    <Select options={availableEducations}
                            placeholder={`${t("Select")}...`}
                            id="education"
                            value={selectedEducation}
                            onChange={handleEducationChange} />
                </div>

                <div className="mb-3">
                    <label className={"form-label ps-0"}>{t("Date of birth")}</label>
                    <div className="col-12">
                        <DatePicker
                            locale={"sl"}
                            dropdownMode={"select"}
                            showYearDropdown={true}
                            minDate={new Date(1950, 0, 1)}
                            maxDate={new Date(2007, 11, 30)}
                            dateFormat={"dd.MM.yyyy"}
                            id="date_of_birth"
                            className={"form-control w-100"}
                            selected={data.date_of_birth ? new Date(data.date_of_birth) : date}
                            onChange={(date) => {updateFields({date_of_birth: date!.toDateString()})}} />
                    </div>
                </div>

                <div className="col-12 text-center">
                    <button disabled={processing} className={"btn btn-primary px-5"}>{t("Update")}</button>
                </div>
            </form>
        </div>
    )

}
