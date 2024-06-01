import {useForm, usePage} from "@inertiajs/react";
import {useLaravelReactI18n} from "laravel-react-i18n";

export default function ({darkBg}) {
    const {post} = useForm();
    let textColor: string = darkBg ? 'text-white' : 'text-dark';
    const {t} = useLaravelReactI18n();
    let user = usePage().props.auth.user;


    const logout = () => {
        post('/logout');
    }

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-10 mx-auto">
                    <nav className="navbar navbar-expand-lg navbar-dark sticky">
                        <a className="navbar-brand" href="#">
                            <img src="/img/logo-main.svg" alt="Logo" height="80"
                                 className="d-inline-block align-text-top"/>
                        </a>


                        <button className="navbar-toggler mt-2" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto text-center mb-2 mb-lg-0">
                                <li className="nav-item my-auto">
                                    <a href="/" className={textColor + " nav-link"}>{t("Home").toUpperCase()}</a>
                                </li>

                                <li className="nav-item my-auto">
                                    <a href="/remote"
                                       className={textColor + " nav-link"}>{t("Online jobs").toUpperCase()}</a>
                                </li>

                                <li className="nav-item my-auto">
                                    <a href="/companies"
                                       className={textColor + " nav-link"}>{t("For companies").toUpperCase()}</a>
                                </li>

                                {user === null ?
                                    <>
                                        <li className="nav-item ms-3 mt-3 my-md-auto">
                                            <a href="/login"
                                               className={"btn btn-primary"}>{t("Login").toUpperCase()}</a>
                                        </li>

                                        <li className="nav-item ms-3 mt-3 my-md-auto">
                                            <a href="/register"
                                               className={"btn btn-outline-primary"}>{t("Register").toUpperCase()}</a>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item ms-3 mt-3 my-md-auto">
                                            <a href="/login" className={"btn btn-primary"}>{t("Your profile")}</a>
                                        </li>

                                        <li className="nav-item ms-3 mt-3 my-md-auto">
                                            <button className={"btn btn-outline-primary"}
                                                    onClick={logout}>{t("Log Out")}</button>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
