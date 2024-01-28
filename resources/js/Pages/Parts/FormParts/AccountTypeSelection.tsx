import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "../../../Components/FancyTitle";

type UserData = {
    is_business_account: boolean
}

type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>, goToNextStep: boolean) => void
}

export function AccountTypeSelection({ is_business_account, updateFields }: UserFormProps) {
    const {t} = useLaravelReactI18n();

    return (
        <>
            <FancyTitle heading={t("Account type")} subtitle={t("Let's get started")} />

            <div className={"col-12 my-5 text-center"}>
                <button type="button" className={"btn btn-lg btn-primary"} title={t("I'm offering work.")} onClick={e => updateFields({is_business_account: true}, true)}>
                    {t("Business Account")}
                </button>

                <button type="button" className={"btn btn-lg btn-outline-primary ms-5"} title={t("I'm looking for work.")} onClick={e => updateFields({is_business_account: false}, true)}>
                    {t("Personal Account")}
                </button>
            </div>
        </>
    )
}
