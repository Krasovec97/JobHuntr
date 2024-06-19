import {useForm} from "@inertiajs/react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import React from "react";

export default function () {
    const {post} = useForm();
    const {t} = useLaravelReactI18n();

    const logout = () => {
        post('/logout');
    }

    return (
        <nav className="navbar navbar-expand-md h-100">
            <ul className="navbar-nav flex-column text-center col-12 h-100">
                <div className="h-25">
                    <li className="nav-item">
                        <a href="/jobs" className="text-white nav-link">
                            <i className="fa-regular fa-clipboard text-white pe-2"></i> {t("Jobs").toUpperCase()}</a>
                    </li>
                </div>
                <hr className="mt-auto text-white"/>
                <div className="h-auto">
                    <li className="nav-item">
                        <a href="/account" className="text-white nav-link">
                            <i className="fa-solid fa-gear text-white pe-2"></i> {t("Settings").toUpperCase()}
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="#" onClick={logout} className="text-white nav-link">
                            <i className="fa-solid fa-arrow-right-from-bracket text-white pe-2"></i> {t("Logout").toUpperCase()}
                        </a>
                    </li>
                </div>
            </ul>
        </nav>
    );
}
