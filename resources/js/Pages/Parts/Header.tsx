import {Link} from "@inertiajs/react";
import {useLaravelReactI18n} from "laravel-react-i18n";

interface HeaderInterface {
    darkBg :boolean
}

export default function ({darkBg}: HeaderInterface) {
    let textColor: string = darkBg ? 'text-white' : 'text-dark';
    const {t} = useLaravelReactI18n();

    const redirectToContactForm = () => {
        window.location.href = '/'+'#contact-form';
    }

    return (
        <nav className="navbar navbar-expand-lg sticky">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a href="/" className={textColor + " nav-link"}>{t("Home").toUpperCase()}</a>
                    </li>

                    <li className="nav-item">
                        <a href="/about-us" className={textColor + " nav-link"}>{t("About us").toUpperCase()}</a>
                    </li>

                    <li className="nav-item">
                        <a href="/about-us" className={textColor + " nav-link"}>{t("For companies").toUpperCase()}</a>
                    </li>

                    <li className="nav-item">
                        <button onClick={redirectToContactForm}
                                className={textColor + " nav-link"}>{t("Contact us").toUpperCase()}</button>
                    </li>

                    <li className="nav-item ms-3">
                        <a href="/login" className={"btn btn-primary"}>{t("Login").toUpperCase()}</a>
                    </li>

                    <li className="nav-item ms-3">
                        <a href="/register" className={"btn btn-outline-primary"}>{t("Register").toUpperCase()}</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
