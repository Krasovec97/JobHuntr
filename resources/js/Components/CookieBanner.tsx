import React from "react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {getClientLang} from "@/Helpers";

export default function CookieBanner() {
    const {t} = useLaravelReactI18n();
    const acceptCookies = () => localStorage.setItem("cookie_accepted", 'yes');


    return (
        <>
            <div className={"offcanvas offcanvas-bottom " + ((localStorage.getItem('cookie_accepted') !== null && localStorage.getItem('cookie_accepted') === 'yes') ? '' : 'show')} id="cookieBanner"
                 aria-labelledby="cookieBannerLabel" data-bs-backdrop="static">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="cookieBannerLabel">{t("Cookies")}</h5>
                    <button className="btn btn-close" data-bs-dismiss="offcanvas" onClick={acceptCookies}></button>
                </div>
                <div className="offcanvas-body small">
                    <div>
                        {t('We use cookies to ensure our site functions properly, gather usage data, remember your preferences.')}
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-primary me-2" data-bs-dismiss="offcanvas" onClick={acceptCookies}>{t('Agree & close')}</button>
                        <a className="btn btn-secondary" href={`/policies/cookie_policy_${getClientLang(navigator.language)}.pdf`} target="_blank">{t('More information')}</a>
                    </div>
                </div>
            </div>
        </>
    );
}
