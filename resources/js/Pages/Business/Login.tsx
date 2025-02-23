import {Head, useForm, usePage} from '@inertiajs/react';
import InputError from "../../Components/InputError";
import PageSection from "../../Components/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "../../Components/FancyTitle";
import React, {useRef, useState} from 'react';


export default function Login() {
    const { data, setData, post,  errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const {t} = useLaravelReactI18n();
    const {app_url} = usePage().props;
    const passwordRef = useRef<HTMLInputElement>(null);
    const [currentIcon, setCurrentIcon] = useState<string>('fa-eye')

    function handleChange(e: any) {
        const key = e.target.id;
        const value = e.target.value
        setData(values => ({
            ...values,
            [key]: value,
        }))
    }

    function submit(e: any) {
        e.preventDefault();
        post('/login');
    }

    function showPassword() {
        if (passwordRef.current) {
            passwordRef.current.type = passwordRef.current.type === 'password' ? 'text' : 'password';
            passwordRef.current.type === 'password' ? setCurrentIcon('fa-eye') : setCurrentIcon('fa-eye-slash');
        }
    }

    return (
        <>
            <Head title={t('[Business] Log in')} />

            <PageSection className={'full-h'}>
                <FancyTitle heading={t("Company login")} subtitle={t("Welcome")} />
                <div className={"col-12 col-md-5 border p-4 rounded mx-auto shadow"}>
                    <form onSubmit={submit}>
                        <div>
                            <label htmlFor="email">{t('Email')}</label>


                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="form-control"
                                autoComplete="email"
                                autoFocus={true}
                                onChange={handleChange}
                            />

                            <InputError message={errors.email} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="email">{t('Password')}</label>

                            <div className="input-group">
                                <input
                                    id="password"
                                    ref={passwordRef}
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="form-control"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <div className="input-group-append">
                                    <button className="btn border-top border-end border-bottom" type="button" onClick={showPassword}>
                                        <i className={`fa-solid ${currentIcon}`}></i>
                                    </button>
                                </div>
                            </div>


                            <InputError message={errors.password} className="mt-2"/>
                        </div>
                        <div className="text-end my-2">
                            <a href={`https://${usePage().props.app_url}/forgotten/password`}>
                                <small>{t("Forgotten password?")}</small>
                            </a>
                        </div>
                        <div className={"col-12 text-center mt-4"}>
                            <button className={"btn btn-primary px-5"}>{t("Login")}</button>
                        </div>
                    </form>

                    <hr/>

                    <div className="text-center">
                        <a href={`https://${app_url}/register`}>
                            <small>{t("Don't have an account yet?")}</small>
                        </a>
                    </div>
                </div>
            </PageSection>
        </>
    );
}
