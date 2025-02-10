import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "../../../Components/FancyTitle";
import React from "react";

type AccountTypeData = {
    is_business_account: boolean,
    setPostUrl: (value: (((prevState: string) => string) | string)) => void
}

type UserFormProps = AccountTypeData & {
    updateFields: (fields: Partial<AccountTypeData>, goToNextStep: boolean) => void
}

export function AccountTypeSelection({updateFields, setPostUrl}: UserFormProps) {
    const {t} = useLaravelReactI18n();

    let handleBusinessAccountClick = () => {
        setPostUrl('/register/company');
        updateFields({is_business_account: true}, true);
    }

    let handlePersonalAccountClick = () => {
        setPostUrl('/register/personal');
        updateFields({is_business_account: false}, true);
    }


    return (
        <>
            <FancyTitle heading={t("Account type")} subtitle={t("Let's get started")}/>

            <div className={"col-12 my-5 text-center"}>
                <button type="button" className={"btn btn-lg btn-primary"} title={t("I'm offering work.")}
                        onClick={handleBusinessAccountClick}>
                    {t("Business Account")}
                </button>

                <button type="button" className={"btn btn-lg btn-outline-primary ms-md-5 mt-4 mt-md-0"}
                        title={t("I'm looking for work.")} onClick={handlePersonalAccountClick}>
                    {t("Personal Account")}
                </button>
            </div>
        </>
    )
}
