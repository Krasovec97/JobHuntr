import {useForm, usePage} from "@inertiajs/react";
import {useLaravelReactI18n} from "laravel-react-i18n";

export default function ({darkBg}) {
    const {post} = useForm();
    let textColor: string = darkBg ? 'text-white' : 'text-dark';
    const {t} = useLaravelReactI18n();
    let user = usePage().props.auth.user;

    const redirectToContactForm = () => {
        window.location.href = '/'+'#contact-form';
    }

    const logout = () => {
        post('/logout');
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

                    {user === null ?
                        <>
                            <li className="nav-item ms-3">
                                <a href="/login" className={"btn btn-primary"}>{t("Login").toUpperCase()}</a>
                            </li>

                            <li className="nav-item ms-3">
                                <a href="/register"
                                   className={"btn btn-outline-primary"}>{t("Register").toUpperCase()}</a>
                            </li>
                        </>
                        :
                        <>
                            <li className="nav-item ms-3">
                                <a href="/login" className={"btn btn-primary"}>{t("Your profile")}</a>
                            </li>

                            <li className="nav-item ms-3">
                                <button className={"btn btn-outline-primary"} onClick={logout}>{t("Log Out")}</button>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    );
}
