import {useForm, usePage} from "@inertiajs/react";
import {useLaravelReactI18n} from "laravel-react-i18n";

export default function () {
    const {post} = useForm();
    const {t} = useLaravelReactI18n();

    const logout = () => {
        post('/logout');
    }

    return (
        <nav className="navbar navbar-expand-md h-100">
            <div className="collapse navbar-collapse h-100" id="navbarSupportedContent">
                <ul className="navbar-nav flex-column text-center col-12 h-100">
                    <div className="h-25">
                        <li className="nav-item">
                            <a href="/jobs" className="text-white nav-link">{t("Jobs").toUpperCase()}</a>
                        </li>

                        <li className="nav-item">
                            <a href="/projects" className="text-white nav-link">{t("Projects").toUpperCase()}</a>
                        </li>
                    </div>
                    <hr className="mt-auto text-white"/>
                    <div className="h-auto">
                        <li className="nav-item">
                            <a href="/about-us"
                               className="text-white nav-link">{t("Account settings").toUpperCase()}</a>
                        </li>

                        <li className="nav-item">
                            <a href="#" onClick={logout}
                               className="text-white nav-link">{t("Logout").toUpperCase()}</a>
                        </li>
                    </div>
                </ul>
            </div>
        </nav>
    );
}
