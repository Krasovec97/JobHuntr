import {useForm, usePage} from "@inertiajs/react";
import {useLaravelReactI18n} from "laravel-react-i18n";

export default function () {
    const {post} = useForm();
    const {t} = useLaravelReactI18n();

    const logout = () => {
        post('/logout');
    }

    return (
        <nav className="navbar navbar-expand-md">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav flex-column text-center col-12">
                    <div className="">
                        <li className="nav-item">
                            <a href="/" className="text-white nav-link">{t("Jobs").toUpperCase()}</a>
                        </li>

                        <li className="nav-item">
                            <a href="/about-us"
                               className="text-white nav-link">{t("Employment forms").toUpperCase()}</a>
                        </li>

                        <li className="nav-item">
                            <a href="/about-us"
                               className="text-white nav-link">{t("Tokens").toUpperCase()}</a>
                        </li>
                    </div>
                    <hr />
                    <div className="d-flex flex-column">
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
