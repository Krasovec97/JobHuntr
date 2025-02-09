import {FormWrapper} from "./FormWrapper";
import {useLaravelReactI18n} from "laravel-react-i18n";
import React from "react";
import {useEffect, useState} from "react";

type AccountData = {
    email: string,
    password: string,
}

type AccountFormProps = AccountData & {
    updateFields: (fields: Partial<AccountData>) => void
}

const validatePasswords = (
    password: string | undefined,
    confirmPassword: string | undefined,
    t: (key: string) => string
): string[] => {
    const errors: string[] = [];

    if (password !== confirmPassword) {
        errors.push(t("The passwords must match!"));
    }
    if (!password || password.length < 8) {
        errors.push(t("The password must have a minimum of 8 characters!"));
    }
    if (!/[.,:/|?!*;@#$%^&\-_=+]/.test(password || "")) {
        errors.push(t("The password must include a symbol!"));
    }

    return errors;
};


export function AccountForm({ email, updateFields }: AccountFormProps) {
    const {t} = useLaravelReactI18n();
    const [passwordInput, setPasswordInput] = useState<string|undefined>();
    const [confirmPassword, setConfirmPassword] = useState<string|undefined>();
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (passwordInput) {
            const validationErrors = validatePasswords(passwordInput, confirmPassword, t);
            setErrors(validationErrors);

            if (validationErrors.length === 0) {
                updateFields({ password: confirmPassword });
            }
        }
    }, [passwordInput, confirmPassword, t, updateFields]);


    const handleCPassword = (e: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
        setConfirmPassword(e.target.value);
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
                    autoComplete="new-password"
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
                    aria-describedby={"passwordHelp"}
                    autoComplete="new-password"
                    onChange={e => setPasswordInput(e.target.value)}/>
                <small id="passwordHelp" className="form-text text-muted">
                    {t("To make your account secure, your password must have a minimum of 8 characters and it must include a symbol.")}
                </small>
            </div>

            <div className="mb-3">
                <label>{t("Repeat password")}</label>
                <input
                    required
                    className={"form-control"}
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={handleCPassword}/>
            </div>

                {errors.length > 0 &&
                    <div className={"text-danger"}>
                        {errors.map((error, index) => <div key={index}>{error}</div>)}
                    </div>
                }
        </FormWrapper>
)
}
