import React from "react";
import {useLaravelReactI18n} from "laravel-react-i18n";

export default function CookieBanner() {
    const {t} = useLaravelReactI18n();
    let cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner !== null) {
        cookieBanner.addEventListener('hidden.bs.offcanvas', function () {
            localStorage.setItem("cookie_accepted", 'yes');
        })
    }


    return (
        <>
            <div className={"offcanvas offcanvas-bottom " + ((localStorage.getItem('cookie_accepted') !== null && localStorage.getItem('cookie_accepted') === 'yes') ? '' : 'show')} id="cookieBanner"
                 aria-labelledby="cookieBannerLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="cookieBannerLabel">{t("Cookies")}</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                </div>
                <div className="offcanvas-body small">
                    <div>
                        {t('We use cookies to ensure our site functions properly, gather usage data, remember your preferences.')}
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-primary me-2" data-bs-dismiss="offcanvas">{t('Agree & close')}</button>
                        <a className="btn btn-secondary" href={`/policies/cookie_policy_${navigator.language}.pdf`} target="_blank">{t('More information')}</a>
                    </div>
                </div>
            </div>
        </>
    );
}
