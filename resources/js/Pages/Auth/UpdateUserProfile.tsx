import {useForm} from "@inertiajs/react";
import Select from "react-select";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {useState} from "react";
import FancyTitle from "../../Components/FancyTitle";
import useGlobalContext from "../../Hooks/useGlobalContext";
import {UserData} from "../../Interfaces/SharedInterfaces";
import React from "react";
import GoogleLocationSelect from "../../Components/GoogleLocationSelect";


interface EducationInterface {
    value: string,
    label: string
}

interface UserObjectData {
    user_id: number,
    date_of_birth: string,
    education: string,
    contact_phone: string,
    address: {
        street: string,
        city: string,
        country: string,
        zip: string,
    }
}

export default function (user: UserData) {
    const {t} = useLaravelReactI18n();

    const typesOfEducation: EducationInterface[] = [
        { value: 'primary', label: t("Primary school or equivalent") },
        { value: 'high_school', label: t("High school or equivalent") },
        { value: 'bachelor', label: t("Bachelor's degree") },
        { value: 'master', label: t("Master's degree") },
        { value: 'doctorate', label: t("Doctorate or higher") }
    ]

    const [selectedEducation, setSelectedEducation] = useState(typesOfEducation.filter((item) => item.value === user.education));
    const globalContext = useGlobalContext();

    const {data, setData, post, processing} = useForm({
        user_id: user.id,
        date_of_birth: user.date_of_birth ?? '',
        education: user.education ?? '',
        contact_phone: user.contact_phone,
        address: {
            street: user.street,
            city: user.city,
            country: user.country,
            zip: user.zip,
        }
    })

    function handleChange(e: any) {
        let key = e.target.id;
        const value = e.target.value;

        setData(values => ({
            ...values,
            [key]: value,
        }))
    }

    function updateFields(fields: Partial<UserObjectData>) {
        setData(prevState => {
            return {...prevState, ...fields};
        })
    }

    function handleEducationChange(e: any) {
        setSelectedEducation(e)
        setData(values => ({
            ...values,
            education: e.value
        }));
    }

    function subtractYears(date: Date, years: number): number {
        return date.setFullYear(date.getFullYear() - years);
    }

    const date = new Date();

    const newDate = new Date(subtractYears(date, 15)).toISOString().split("T")[0];

    let csrfToken = document.querySelector("meta[name='csrf-token']")?.getAttribute("content");

    function handleSubmit(e: any) {
        e.preventDefault()
        post('user/update', {
            headers: {
                'X-CSRF-TOKEN': csrfToken ?? ''
            },
            onError: (errors: any) => {
                globalContext?.FlashNotification.setText(errors);
                globalContext?.FlashNotification.setIsOpen('true');
                globalContext?.FlashNotification.setStyle("success");
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
        <div className={"shadow p-5 my-5 col-12 col-md-8 mx-auto"}>
            <FancyTitle heading={t("Update your profile").toUpperCase()} subtitle={t("Spruce up your profile, :name!", {name: user.name})} />
            <form onSubmit={handleSubmit} className={"col-12 col-md-8 mx-auto"}>
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
                        onChange={handleChange}/>
                    <small>
                        {t("Please include country code for your telephone number (Start with +). Your telephone number also shouldn't contain any spaces.")}
                    </small>
                </div>

                <div className="mb-3">
                    <GoogleLocationSelect updateFields={updateFields} address={data.address} showAllFields={true}/>
                </div>

                <div className="mb-3">
                    <label className={"form-label ps-0"}>{t("Your education")}</label>
                    <Select options={typesOfEducation}
                            id="education"
                            value={selectedEducation}
                            onChange={handleEducationChange} />
                </div>

                <div className="mb-3">
                    <label className={"form-label ps-0"}>{t("Date of birth")}</label>
                    <input
                        id="date_of_birth"
                        className={"form-control"}
                        max={newDate}
                        type="date"
                        value={data.date_of_birth}
                        onChange={handleChange}/>
                </div>

                <div className="col-12 text-center">
                    <button disabled={processing} className={"btn btn-primary px-5"}>{t("Update")}</button>
                </div>
            </form>
        </div>
    )

}
