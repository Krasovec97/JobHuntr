import React, {useRef, useState} from "react";
import axios from "axios";
import FancyTitle from "@/Components/FancyTitle";
import {useLaravelReactI18n} from "laravel-react-i18n";

export default function Resume() {
    const {t} = useLaravelReactI18n();
    const [errors, setErrors] = useState<string[]|null>(null);
    const uploadedResume = useRef<HTMLInputElement>(null);

    function uploadNewResume() {
        let formData = new FormData();
        if (uploadedResume.current && uploadedResume.current.files && uploadedResume.current.files.length > 0) {
            formData.append("resume", uploadedResume.current.files[0]);

            axios.post('/user/resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                window.location.reload();
            }).catch((error) => {
                setErrors(error.response.data.errors);
            })
        }
    }

    return (
        <div className="row full-h">
            <div className="text-center mb-3">
                <p className="fw-bold m-0">{t("Upload a new resume")}</p>
                <small>({t("File must be a PDF and not exceed :size MB in size.", {size: 5})})</small>

            </div>
            <div className="col-12 col-xl-6 mx-auto">
                <input
                    type="file"
                    id="resume"
                    ref={uploadedResume}
                    accept="application/pdf,application/vnd.ms-excel"
                    name="resume"
                    required
                    className={"form-control"}/>

                {errors &&
                    <div className={"my-3 text-danger fw-semibold"}>
                        {errors.map((error, index) => <div key={index}>{error}</div>)}
                    </div>
                }

                <div className="mt-3 text-end">
                    <button className="btn btn-primary" type={"submit"} onClick={() => uploadNewResume()}>{t("Upload")}</button>
                </div>
            </div>

            <div className="col-12 mt-5 text-center">
                <FancyTitle heading={t("Your resume").toUpperCase()} subtitle={""} />
                <object data="/user/resume" width="100%" height="1200px" type="application/pdf">
                    <p>{t("You have not uploaded any resume yet. Upload your resume now to showcase your skills and experience!")}</p>
                </object>
            </div>
        </div>
    )
}
