import {useLaravelReactI18n} from "laravel-react-i18n";

export default function ({company}) {
    const {t} = useLaravelReactI18n()
    return (
        <div className="row border-bottom border-dark border-opacity-10 pb-3">
            <div className="col-12">{company.full_name}</div>
        </div>
    )
}
