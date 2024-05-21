import {useLaravelReactI18n} from "laravel-react-i18n";
import ApplicationLogo from "../../Components/ApplicationLogo";

export default function () {
    const {t} = useLaravelReactI18n();
    return (
        <>
            <footer className="bg-dark py-3 text-center">
                <div>
                    <ApplicationLogo />
                </div>
                <div className="mt-3">
                    {t("© 2024 JobHuntr | All rights reserved | Terms of use")}
                </div>
            </footer>
        </>
    );
}
