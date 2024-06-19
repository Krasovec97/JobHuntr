import {useForm, usePage} from "@inertiajs/react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import ApplicationLogo from "../../Components/ApplicationLogo";
import React from "react";
import {UserAuthProps, UserData} from "../../Interfaces/SharedInterfaces";

interface HeaderProps {
    darkBg: boolean
}

export default function ({darkBg}: HeaderProps) {
    const {post} = useForm();
    let textColor: string = darkBg ? 'text-white' : 'text-dark';
    const {t} = useLaravelReactI18n();
    let user: UserData = usePage<UserAuthProps>().props.auth.user;


    const logout = () => {
        post('/logout');
    }

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-10 mx-auto">
                    <nav className="navbar navbar-expand-lg navbar-dark sticky">
                        <a className="navbar-brand" href="/">
                            <ApplicationLogo width={330}/>
                        </a>


                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
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
                                    <a href="/jobs"
                                       className={textColor + " nav-link"}>{t("Jobs").toUpperCase()}</a>
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
