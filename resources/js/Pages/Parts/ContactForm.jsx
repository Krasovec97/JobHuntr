import {useLaravelReactI18n} from "laravel-react-i18n";

export default function () {
    const {t} = useLaravelReactI18n();

    return (
        <>
            <form>
                <div className="row">
                    <div className="mb-3 col-6">
                        <input required={true} type="text" className="form-control border-0 border-bottom" placeholder={"* " + t("Your Name")} id="nameInput" />
                    </div>
                    <div className="mb-3 col-6">
                        <input required={true} type="text" className="form-control border-0 border-bottom" placeholder={"* " + t("Your E-Mail")} id="emailInput" />
                    </div>
                </div>

                <div className="row">
                    <div className="mb-3 col-6">
                        <input type="text" className="form-control border-0 border-bottom" placeholder={t("Your Phone")} id="phoneInput" />
                    </div>
                    <div className="mb-3 col-6">
                        <input required={true} type="text" className="form-control border-0 border-bottom" placeholder={"* " + t("Subject")} id="subjectInput"/>
                    </div>
                </div>

                <div className="mb-3 col-12">
                    <textarea required={true} id="messageInput" className="form-control border-0 border-bottom" placeholder={"* " + t("Your Message")}></textarea>
                </div>

                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary px-4 rounded-4">{t("Send now")}</button>
                </div>
            </form>
        </>
    )
}
