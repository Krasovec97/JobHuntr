import {FormWrapper} from "./FormWrapper";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {useEffect, useState} from "react";

type AccountData = {
    email: string,
    password: string,
}

type AccountFormProps = AccountData & {
    updateFields: (fields: Partial<AccountData>) => void
}

export function AccountForm({ email, password, updateFields }: AccountFormProps) {
    const {t} = useLaravelReactI18n();
    const [passwordInput, setPasswordInput] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);

    useEffect(() => {
        if (isCPasswordDirty) {
            if (passwordInput === cPassword) {
                setShowErrorMessage(false);
                updateFields({password: cPassword})
            } else {
                setShowErrorMessage(true)
            }
        }
    }, [cPassword])

    const handleCPassword = (e) => {
        setCPassword(e.target.value);
        setIsCPasswordDirty(true);
    }

    return (
        <FormWrapper title={t("Account Information")} subtitle={t("Lets create a way to login!")}>

            <div className="mb-3">
                <label>{t("Email")}</label>
                <input
                    autoFocus
                    required
                    className={"form-control"}
                    type="email"
                    value={email}
                    onChange={e => updateFields({email: e.target.value})}/>
            </div>

            <div className="mb-3">
                <label>{t("Password")}</label>
                <input
                    required
                    className={"form-control"}
                    type="password"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label>{t("Repeat password")}</label>
                <input
                    required
                    className={"form-control"}
                    type="password"
                    value={cPassword}
                    onChange={handleCPassword}/>
            </div>

                {showErrorMessage && isCPasswordDirty && <div className={"text-danger"}
                                          id={"password_must_match_container"}>{t("The passwords must match!")}</div>}
        </FormWrapper>
)
}
