import {useLaravelReactI18n} from "laravel-react-i18n";

export default function ({company, tokensRemaining}) {
    const {t} = useLaravelReactI18n()
    return (
        <div className="row border-bottom border-dark border-opacity-10 pb-3">
            <div className="col-9">{company.full_name}</div>
            <div className="col-3 text-end">
                <span>{t("Tokens")}: </span>
                <span className="fw-bold text-primary">
                    {tokensRemaining}<img src="/favicon.ico" height={25} className={"align-top"} alt="Tokens"/>
                </span>
            </div>
        </div>
    )
}
